import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/sweetAlartGlass.css'; 
import useAxios from '../hooks/useAxios';
import useBusName from '../hooks/useBusName';

const PersonalInfo = () => {
  const [user, setUser] = useState({});
  const axios = useAxios();
  // const user = {
  //   cardUID: '1234-5678-9101',
  //   studentID: 'WEB8-3440',
  //   name: 'Md Rakib Hassan',
  //   department: 'CSE',
  //   money: '$200'
  // };
  useEffect(() => {
    const id=localStorage.getItem('id');
    axios.get(`/student/${id}`)
      .then(res => setUser(res.data));
    console.log(user);
  }, [axios]);


  const handleChangePassword = () => {
    Swal.fire({
      title: '<h2 class="swal-title">Change Password</h2>',
      html: `
        <input type="password" id="prevPassword" class="swal2-input" placeholder="Previous Password">
        <input type="password" id="newPassword" class="swal2-input" placeholder="New Password">
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      customClass: {
        popup: 'glass-swal',  
      },
      preConfirm: () => {
        const prevPassword = Swal.getPopup().querySelector('#prevPassword').value;
        const newPassword = Swal.getPopup().querySelector('#newPassword').value;
        if (!prevPassword || !newPassword) {
          Swal.showValidationMessage(`Please enter both previous and new passwords`);
        }
        return { prevPassword, newPassword };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Previous Password:', result.value.prevPassword);
        console.log('New Password:', result.value.newPassword);
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center  text-white">
      <div className="w-full max-w-lg p-8 backdrop-blur-md bg-gray-600 bg-opacity-10 rounded-xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-8 drop-shadow-lg">Personal Info</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">Card UID:</span>
            <span className="text-gray-100 font-medium">{user?.cardUID}</span>
          </div>
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">Role:</span>
            <span className="text-gray-100 font-medium">{user?.role}</span>
          </div>
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">{user.role=='Student'?'Student':'Employee'} ID:</span>
            <span className="text-gray-100 font-medium">{user?.studentID}</span>
          </div>
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">Name:</span>
            <span className="text-gray-100 font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">Department:</span>
            <span className="text-gray-100 font-medium">{user?.department}</span>
          </div>
          <div className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-4 shadow-md">
            <span className="text-gray-300 font-semibold">Balance:</span>
            <span className="text-gray-100 font-medium"><span className='text-2xl'>৳</span>{user?.money}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleChangePassword}
            className="py-2 px-4 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </div>

    </div>
  );
};

export default PersonalInfo;
