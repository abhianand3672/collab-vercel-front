import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRegisterRoute, checkUserRegistration } from '../utils/auth.js';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAlreadyAdded, setShowAlreadyAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRegistration = async () => {
      const registered = await checkUserRegistration();
      setIsRegistered(registered);
      setLoading(false);
    };

    checkRegistration();
  }, []);

  const handleAddSkillsClick = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If user is not logged in, redirect to sign-up page
      navigate('/sign-up');
      return;
    }
    
    if (isRegistered) {
      // If user is registered, show "Already Added" message
      setShowAlreadyAdded(true);
      // Hide the message after 3 seconds
      setTimeout(() => setShowAlreadyAdded(false), 3000);
    } else {
      // If user is not registered, navigate to register page
      navigate('/register');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800">
      {/* Hero Section */}
      <section className="text-center my-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
          Collaborate and Build with Fellow Students
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          A collaborative platform where college students can showcase their skills, find like-minded peers, and work together on exciting projects.
        </p>
        <div className="mt-6">
          <Link
            to={getRegisterRoute()}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Collaboration !
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Register Your Skill</h2>
          <p className="text-gray-600">
            Create a profile and highlight your talents — from design to coding, writing, and more.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Discover Talent</h2>
          <p className="text-gray-600">
            Browse through a network of students and find collaborators for your next big idea.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Collaborate on Projects</h2>
          <p className="text-gray-600">
            Work with others in real-time, share progress, and build awesome things together.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Ready to showcase your skills?
        </h2>
        <p className="text-gray-600 mb-6">Join now and become part of a growing community of student creators.</p>
        <div className="space-y-2">
          <button
            onClick={handleAddSkillsClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Add Your Skills
          </button>
          {showAlreadyAdded && (
            <p className="text-green-600 font-medium">✓ Already added</p>
          )}
        </div>
      </section>
    </div>
  );
}
