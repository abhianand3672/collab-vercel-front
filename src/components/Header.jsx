import { FaSearch, FaBars, FaHome, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, logout } from '../utils/auth.js';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <header className="bg-sky-100 shadow-md relative">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

          <Link to='/'>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-blue-700 mr-1">College</span>
              <span className="text-blue-500">Collab</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4">
            <Link to='/'>
              <li className="text-blue-600 hover:underline">
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li className="text-blue-600 hover:underline">
                About
              </li>
            </Link>
            {isLoggedIn() ? (
              <>
                <Link to='/profile'>
                  <li className="text-blue-600 hover:underline">
                    Profile
                  </li>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to='/sign-up'>
                <li className="text-blue-600 hover:underline">
                  Enter
                </li>
              </Link>
            )}
          </ul>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            {/* Profile Link - Always Visible */}
            {isLoggedIn() && (
              <Link to='/profile' className="text-blue-600 hover:underline text-sm">
                Profile
              </Link>
            )}
            
            {/* Dropdown Menu Button */}
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FaBars className="text-blue-600 text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showDropdown && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <div className="p-4 space-y-3">
              <Link 
                to='/' 
                className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </Link>
              
              <Link 
                to='/about' 
                className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <FaInfoCircle className="text-lg" />
                <span>About</span>
              </Link>
              
              {isLoggedIn() ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors w-full text-left"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link 
                  to='/sign-up' 
                  className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <span>Enter</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Overlay to close dropdown when clicking outside*/}
      {showDropdown && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
