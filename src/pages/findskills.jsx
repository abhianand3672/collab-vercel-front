import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FindSkills() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please sign in to view skills');
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/user/all-registered`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || 'Failed to fetch users');
          return;
        }

        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.collegeName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="text-xl font-semibold text-blue-600">Loading skills...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <div className="text-red-500 font-semibold mb-4">{error}</div>
        <Link to="/sign-in" className="text-blue-600 hover:underline">
          Sign in to view skills
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Find Skills & Collaborate
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover talented students from different colleges and connect for exciting projects
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name, skills, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Found <span className="font-semibold text-blue-600">{filteredUsers.length}</span> Matching...
        </p>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {searchTerm ? 'No users found matching your search.' : 'No registered users found.'}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* User Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {user.name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {user.name || user.username}
                    </h3>
                    <p className="text-blue-100">{user.collegeName}</p>
                    <p className="text-blue-100 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-6">
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {user.skills || 'Skills not specified'}
                  </p>
                </div>

                {/* Skill Links */}
                {user.skillLinks && user.skillLinks.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Portfolio Links</h4>
                    <div className="space-y-1">
                      {user.skillLinks.slice(0, 2).map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:underline text-sm truncate"
                        >
                          {link}
                        </a>
                      ))}
                      {user.skillLinks.length > 2 && (
                        <p className="text-gray-500 text-sm">
                          +{user.skillLinks.length - 2} more links
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* LinkedIn */}
                {user.linkedin && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">LinkedIn</h4>
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm truncate block"
                    >
                      {user.linkedin}
                    </a>
                  </div>
                )}

                {/* Contact Button */}
                {/* <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                    Contact & Collaborate
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Want to showcase your skills and connect with others?
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Complete Your Profile
        </Link>
      </div> */}
    </div>
  );
}
