import React from 'react';



import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const HomeLayout = () => {
   
    return (
      
        <div>
          
      
     
      <nav className="bg-slate-900 mb-12 md:py-4 py-8  ">
        <Navbar></Navbar>
      </nav>
      
       
      <div className='min-h-[calc(100vh-100px)] '>
        {/* Dynamic Section */}
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />


    
     
     
        </div>
    );
};

export default HomeLayout;