'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.fullname.length > 0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setError('');
        setLoading(true);
        const response = await axios.post('/api/register', user);
        console.log("Signup success", response.data);
        router.push("/signin");
    } catch (error) {
        toast.error(error.message)
        setError(error.response?.data?.error || 'An error occurred during signup');
    } finally {
        setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to <span className="text-primary-600">Workflo</span>!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={user.fullname}
            onChange={(e) => setUser({...user, fullname: e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            required
          />
          <InputAdornment position="end" className="absolute right-3 top-2.5">
            <IconButton
              onClick={togglePasswordVisibility}
              onMouseDown={handleMouseDownPassword}
              className="text-gray-400 mt-6"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          disabled={buttonDisabled || loading}
          type="submit"
          className={`w-full bg-button-gradient text-white py-2 rounded-md transition-colors ${
            buttonDisabled || loading ? 'opacity-50 cursor-not-allowed' : 'bg-button-gradient-hover'
          }`}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="text-secondary-55 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}