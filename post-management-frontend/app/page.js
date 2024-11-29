'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:3000/api/get-posts'); 
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch posts only if logged in
    if (localStorage.getItem('token')) {
      fetchPosts();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Hero Section */}
      <section className="text-center text-white py-20 px-6">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome to the Post Management System
        </h1>
        <p className="text-xl mb-8">
          Manage posts with an intuitive and modern interface.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Posts Section */}
      {localStorage.getItem('token') && (
        <section className="py-20 bg-gray-100">
          <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Available Posts
            </h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No posts available at the moment.</p>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">
                Role-based Access Control
              </h3>
              <p className="text-gray-600">
                Manage user permissions based on roles for secure access to content.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Intuitive UI</h3>
              <p className="text-gray-600">
                A simple and user-friendly interface designed for smooth navigation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Post Management</h3>
              <p className="text-gray-600">
                Effortlessly create, edit, and manage posts in a centralized platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-20 bg-blue-800 text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-6">Create an account and begin managing posts today.</p>
        <button
          onClick={() => router.push('/register')}
          className="px-8 py-4 bg-yellow-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
        >
          Sign Up Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 Post Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
