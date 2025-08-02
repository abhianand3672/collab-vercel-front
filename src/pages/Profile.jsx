import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        // First try to get full profile
        const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          setLoading(false);
          return;
        }

        // If full profile fails, try to get basic user info
        const basicRes = await fetch('http://localhost:3000/api/user/basic', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (basicRes.ok) {
          const basicData = await basicRes.json();
          setUserData(basicData);
        } else {
          const errorData = await basicRes.json();
          setError(errorData.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/user/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to delete profile');
        return;
      }

      // Clear localStorage and redirect to home
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="text-xl font-semibold text-blue-600">Loading profile...</div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="text-red-500 font-semibold mb-4">{error}</div>
        <Link to="/sign-in" className="text-blue-600 hover:underline">
          Sign in to view your profile
        </Link>
      </div>
    );
  }

  // If user is not registered (no additional profile data)
  if (!userData.isRegistered) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          <span className="text-blue-700">User</span>{' '}
          <span className="text-blue-500">Profile</span>
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {userData.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">{userData.username}</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          <div className="border-t pt-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                You haven't completed your profile yet. Complete your profile to showcase your skills!
              </p>
              <Link
                to="/register"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is registered (has complete profile data)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">
        <span className="text-blue-700">User</span>{' '}
        <span className="text-blue-500">Profile</span>
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {userData.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-blue-600 font-medium">{userData.collegeName}</p>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{userData.skills}</p>
          </div>
        </div>

        {/* LinkedIn Section */}
        {userData.linkedin && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">LinkedIn</h3>
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {userData.linkedin}
            </a>
          </div>
        )}

        {/* Skill Links Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skill Showcase Links</h3>
          <div className="space-y-3">
            {userData.skillLinks?.map((link, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mr-4"
          >
            Edit Profile
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete Profile
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Delete Profile</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your profile? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
