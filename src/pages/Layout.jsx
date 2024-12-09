import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <div className='flex'>
            <Sidebar className={'flex-none'}></Sidebar>
            <Outlet className={'flex-1'}></Outlet>
        </div>
    );
};

export default Layout;