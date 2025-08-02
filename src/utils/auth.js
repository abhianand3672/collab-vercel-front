const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Simple utility to check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

// Get the appropriate route based on login status
export const getRegisterRoute = () => {
  return isLoggedIn() ? '/find-skills' : '/sign-up';
};

// Clear authentication data
export const logout = () => {
  localStorage.removeItem('token');
};

// Check if token is valid (basic check - you might want to add JWT validation)
export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // Basic check - you can add more sophisticated JWT validation here
  // For now, we'll just check if the token exists and has a reasonable length
  return token.length > 10;
};

// Check if user has already registered their skills
export const checkUserRegistration = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return false;
    }

    // Use the full profile endpoint instead of basic to get complete user data
    const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      console.log('Response not ok');
      return false;
    }

    const data = await res.json();
    console.log('User data:', data);
    
    // Check if user has actually completed their profile
    const hasCompletedProfile = data.name && data.skills && data.collegeName && data.isRegistered;
    console.log('Has completed profile:', hasCompletedProfile);
    
    return hasCompletedProfile;
  } catch (error) {
    console.error('Error checking user registration:', error);
    return false;
  }
}; 
