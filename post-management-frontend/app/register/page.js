'use client';
import { useState } from 'react';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://127.0.0.1:3000/api/register', formData);
      console.log('Registration successful:', response.data);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.description || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <button
            onClick={() => router.push('/login')}
            className="text-red-500 hover:text-blue-600 font-bold transition-colors duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
