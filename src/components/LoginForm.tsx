'use client';

import { useState } from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful login, e.g., store token, redirect user
      console.log('Login successful:', data);
      const result = await response.json();
      setToken(result.token);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to <span className="text-primary-600">Workflo</span>!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputAdornment position="end" className="absolute right-3 top-2.5">
            <IconButton
              onClick={togglePasswordVisibility}
              onMouseDown={handleMouseDownPassword}
              className="text-gray-400 mt-5"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        </div>
        <button
          type="submit"
          className="w-full bg-button-gradient text-white py-2 rounded-md transition-colors bg-button-gradient-hover"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account? Create a{' '}
        <Link href="/signup" className="text-secondary-55 hover:underline">
          new account?
        </Link>
        
      </p>
    </div>
  );
}
