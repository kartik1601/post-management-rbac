'use client';
import { useState } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://127.0.0.1:3000/api/login', { email, password });
      console.log('Login successful:', response.data);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.description || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <button
            onClick={() => router.push('/register')}
            className="text-yellow-500 hover:text-green-600 font-semibold transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>

      </form>
    </div>
  );
}
