// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with actual auth logic

  const handleLogout = () => {
    // Implement logout logic
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">
        <Link href="/">Home</Link>
      </h1>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="font-bold text-gray-700 hover:text-blue-500">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-gray-700 hover:text-blue-500">
          Login
        </Link>
      )}
    </nav>
  );
}
