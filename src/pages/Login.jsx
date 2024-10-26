// src/Login.js
import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ id: '', password: '' });
    const axios = useAxios();
    const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      axios.post('/login', formData)
          .then(res => {
              localStorage.setItem('id', res?.data?.id);
              return navigate('/');
          })
          .catch(err => Swal.fire(err?.response?.data?.massage, '', 'error'));

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600">Log in to your account</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700">ID</label>
            <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
              <FaUserAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your ID"
              required
            />
          </div>
          
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <a href="#!" className="text-blue-500 hover:text-blue-700 font-semibold">
              Contact with Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
