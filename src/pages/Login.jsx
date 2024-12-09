import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
    axios.post('/login', formData)
      .then(res => {
        localStorage.setItem('id', res?.data?.id);
        localStorage.setItem('role', res?.data?.role);
        return navigate('/');
      })
      .catch(err => Swal.fire(err?.response?.data?.message, '', 'error'));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-950">
      <div className="w-full max-w-md p-8 space-y-8 backdrop-blur-xl bg-white bg-opacity-10 rounded-3xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">Welcome Back</h2>
        <p className="text-center text-gray-200">Log in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-200">ID</label>
            <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
              <FaUserAlt className="text-blue-200" />
            </div>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white bg-opacity-20 text-white placeholder-gray-300"
              placeholder="Enter your ID"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-200">Password</label>
            <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
              <FaLock className="text-blue-200" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white bg-opacity-20 text-white placeholder-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
  type="submit"
  className="w-full py-2 text-lg font-semibold text-white bg-gradient-to-r from-[rgba(96,165,250,0.3)] to-[rgba(37,99,235,0.3)] backdrop-blur-md border border-blue-400 rounded-lg shadow-lg hover:from-[rgba(96,165,250,0.4)] hover:to-[rgba(37,99,235,0.4)] focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
>
  Log In
</button>
        </form>

        <div className="text-center">
          <p className="text-gray-200">
            Don’t have an account?{' '}
            <a href="#!" className="text-blue-300 hover:text-blue-400 font-semibold">
              Contact with Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
