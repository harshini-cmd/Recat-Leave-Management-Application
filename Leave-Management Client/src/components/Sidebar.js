import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isLoggedIn }) => {
  const location = useLocation();

  const sidebarLinks = [
    { path: '/dashboard', label: 'Home' },
    { path: '/employees', label: 'Employees' },
    { path: '/leave', label: 'Leave Requests' },
    { path: '/leave-balance', label: 'Leave Balances' },
    {path: '/',label :'Sign Out'}
    // Add more route links based on your application's functionalities
    // For example: { path: '/reports', label: 'Reports' },
  ];

  const renderSidebarLinks = () => {
    return sidebarLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`block py-2 px-4 rounded-md transition-colors ${
          location.pathname === link.path
            ? 'bg-blue-600 text-white'
            : 'text-gray-200 hover:bg-gray-700'
        }`}
        onClick={()=>{link.label == "Sign Out" && localStorage.clear()}}
      >
        {link.label}
      </Link>
    ));
  };

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 text-white py-4 px-6">
      {/* Sidebar Logo or Title */}
      <h1 className="text-xl font-semibold mb-6">Office Leave Management</h1>

      {/* Render the sidebar links */}
      {renderSidebarLinks()}

      {/* Optional: Render sign in / sign up links for non-authenticated users */}
      {!isLoggedIn && (
        <>
          <Link to="/" className="block py-2 px-4 rounded-md text-gray-200 hover:bg-gray-700">
            Sign In
          </Link>
          <Link to="/" className="block py-2 px-4 rounded-md text-gray-200 hover:bg-gray-700">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
