import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    skills: '',
    linkedin: '',
    skillLinks: ['']
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to sign-in if not authenticated
      navigate('/sign-in');
      return;
    }
    setCheckingAuth(false);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSkillLinkChange = (index, value) => {
    const newSkillLinks = [...formData.skillLinks];
    newSkillLinks[index] = value;
    setFormData({
      ...formData,
      skillLinks: newSkillLinks
    });
  };

  const addSkillLink = () => {
    setFormData({
      ...formData,
      skillLinks: [...formData.skillLinks, '']
    });
  };

  const removeSkillLink = (index) => {
    if (formData.skillLinks.length > 1) {
      const newSkillLinks = formData.skillLinks.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        skillLinks: newSkillLinks
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

   // add a constrint on linkedin url and github url
  const linkedinUrlPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i;
  const githubUrlPattern = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/i;

  // Validate LinkedIn URL if provided
  if (formData.linkedin.trim() !== '' && !linkedinUrlPattern.test(formData.linkedin.trim())) {
    setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/your-profile)');
    setLoading(false);
    return;
  }

  // Validate skill links: must be GitHub URLs only
  const invalidSkillLinks = formData.skillLinks.filter(
    link => link.trim() !== '' && !githubUrlPattern.test(link.trim())
  );
  if (invalidSkillLinks.length > 0) {
    setError('Skill links must be valid GitHub profile or repository URLs.');
    setLoading(false);
    return;
  }

    // Validate that at least one skill link is provided
    const validSkillLinks = formData.skillLinks.filter(link => link.trim() !== '');
    if (validSkillLinks.length === 0) {
      setError('At least one skill link is mandatory');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          skillLinks: validSkillLinks
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Redirect to profile page after successful registration
      navigate('/profile');
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <div className="text-xl font-semibold text-blue-600">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">
        <span className="text-blue-700">Complete Your</span>{' '}
        <span className="text-blue-500">Profile</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* College Name */}
        <div>
          <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
            College Name *
          </label>
          <input
            type="text"
            id="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your college name"
          />
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
            Skills *
          </label>
          <textarea
            id="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your skills (e.g., React, UI/UX Design, Editor, etc.)"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        {/* Skill Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Links to Show Skills * (At least one required)
          </label>
          {formData.skillLinks.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleSkillLinkChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/your-username or portfolio link"
              />
              {formData.skillLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkillLink(index)}
                  className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSkillLink}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            + Add Another Link
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Joining...' : 'Join Skill Share'}
        </button>
      </form>
    </div>
  );
}
