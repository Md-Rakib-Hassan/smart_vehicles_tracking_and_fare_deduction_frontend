import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import '../css/sweetAlartGlass.css';

const AddUser = () => {
    const blankFormData = {
        name: '',
        cardUID: '',
        department: '',
        money: '',
        studentID: '',
        role: '',
        password: ''
    }
    const [formData, setFormData] = useState(blankFormData);
    const [uid, setUid] = useState(null);
    const [popUp, setpopUp] = useState(1);
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Waiting for Scan card...',
            html:`<img src="/rfid.png" alt="rfid" class="h-36 w-auto mx-auto" />`,
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Close',
            customClass: {
                popup: "glass-swal",
                icon: "no-bg",
              },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/dashboard'); // Navigate to /dashboard on button click
            }
        });

        const interval = setInterval(() => {
            axios.get('/regirstration-queue')
                .then(res => {
                    setUid(res.data.cardUID);
                    if (res.data.cardUID) {
                        clearInterval(interval);
                        Swal.close(); // Close the SweetAlert once UID is obtained
                    }
                })
                .catch(error => {
                    console.error("Error fetching UID:", error);
                    clearInterval(interval); // Stop the interval on error
                    Swal.close();
                });
        }, 1000); // Check every second

        // Cleanup interval on component unmount
        // return () => clearInterval(interval);
    }, [axios,popUp]);

    // Update formData once uid is fetched
    useEffect(() => {
        if (uid) {
            setFormData(prevFormData => ({
                ...prevFormData,
                cardUID: uid
            }));
        }
    }, [uid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/add-user', formData)
            .then(res => {
                setFormData(blankFormData);
                setpopUp(pre => !pre);
                Swal.fire({
                    titleText: "User added successfully!",
                    icon: "success",
                    showConfirmButton: false,
                      timer: 1500,
                    customClass: {
                      popup: "glass-swal",
                      icon: 'no-bg'
                      
                    },
                  })
            })
            .catch(error => { 
                console.log(error);
                Swal.fire({
                    titleText: 'There is a error occurred!',
                    icon: "error",
                    showConfirmButton: false,
                      timer: 1500,
                    customClass: {
                      popup: "glass-swal",
                      
                    },
                })
            })
    };

    return (
        <div className="flex items-center w-full justify-center min-h-screen text-white">
            <div className="w-full max-w-2xl p-8 bg-gray-600/10 backdrop-blur-md rounded-lg shadow-lg border border-white border-opacity-20">
                <h2 className="text-3xl font-bold text-center mb-8">Add New User</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Name</label>
                        
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Card UID</label>
                        <input
                            type="text"
                            name="cardUID"
                            value={formData.cardUID || 'Loading...'}
                            readOnly
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            placeholder="Enter department"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Money</label>
                        <input
                            type="number"
                            name="money"
                            value={formData.money}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Student ID</label>
                        <input
                            type="text"
                            name="studentID"
                            value={formData.studentID}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            placeholder="Enter student ID"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block font-semibold mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            required
                        >
                            <option value="" disabled>Select role</option>
                            <option className='text-black' value="Student">Student</option>
                            <option className='text-black' value="Driver">Driver</option>
                            <option className='text-black' value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-md border border-gray-300/40"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="py-2 px-4 w-full bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700/40 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
