import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // ✅ Successful login - navigate to home page
      navigate('/');
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        <span className="text-blue-700">Sign</span>{' '}
        <span className="text-blue-500">in</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />
        <button className="bg-sky-200 shadow-md text-blue-700 font-semibold p-3 rounded-lg hover:opacity-90">
          Sign in
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
      )}

      <p className="text-center font-semibold mt-4">
        Don't have an account?{' '}
        <Link to="/sign-up" className="text-blue-600 font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
