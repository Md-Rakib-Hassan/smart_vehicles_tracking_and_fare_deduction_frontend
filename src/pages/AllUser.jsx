import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const axios = useAxios();
    useEffect(() => {
        axios.get('/all-user')
            .then(res => setUsers(res.data))
    }, [axios]);
    return (
        <div className="p-8 text-white mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">All Users</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg max-h-[80vh]">
                <table className="min-w-full bg-gray-600/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-white/10 backdrop-blur-md">
                        <tr>
                            <th className="px-6 py-4 text-left">No</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Department</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Student ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-white/20">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{user.name || ''}</td>
                                    <td className="px-6 py-4">{user.department || ''}</td>
                                    <td className="px-6 py-4">{user.role || ''}</td>
                                    <td className="px-6 py-4">{user.studentID || ''}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
