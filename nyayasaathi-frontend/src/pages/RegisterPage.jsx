// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    aadhaarNumber: '',
    role: 'citizen',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    try {
      await api.post('/users/create', formData);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. The email or Aadhaar number may already be in use.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-primary text-center mb-2">Nyaya Saathi</h1>
        <h2 className="text-2xl font-bold text-center text-brand-dark mb-6">Create a New Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">Full Name</label>
            <input className="w-full px-3 py-2 border border-brand-gray rounded-lg" type="text" name="fullName" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border border-brand-gray rounded-lg" type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="aadhaarNumber">Aadhaar Number (12 digits)</label>
            <input className="w-full px-3 py-2 border border-brand-gray rounded-lg" type="text" name="aadhaarNumber" pattern="\d{12}" title="12 digit Aadhaar number" onChange={handleChange} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password (at least 6 characters)</label>
            <input className="w-full px-3 py-2 border border-brand-gray rounded-lg" type="password" name="password" onChange={handleChange} required />
          </div>
          
          <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-secondary">
            Register
          </button>
        </form>
         <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-brand-primary font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;