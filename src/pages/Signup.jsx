import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null); // <- Add error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) {
      setError('All details are required');
      return;
    }
    setError(null); // clear previous errors

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      navigate('/sign-in');
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        <span className='text-blue-700'>Sign</span>{' '}
        <span className='text-blue-500'>up</span>
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-md mx-auto'>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        
        <input
          type="email"
          placeholder="Please enter valid email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-sky-200 shadow-md text-blue-700 font-semibold p-3 rounded-lg hover:opacity-90">
          Sign up
        </button>
      </form>

      {/* Show error message */}
      {error && (
        <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
      )}

      <p className="text-center font-semibold mt-4">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-blue-600 font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
