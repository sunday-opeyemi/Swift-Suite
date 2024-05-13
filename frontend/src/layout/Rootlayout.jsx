import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/Dashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from '../Side/Sidebar';
import Header from '../Nav/Header';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import Enrolment from '../Vendorenrolment/Enrolment';
import Catalogue from '../pages/Catalogue';
import Inventory from '../pages/Inventory';
import Lipsey from '../Vendorenrolment/Lipsey';
import Fragrancex from '../Vendorenrolment/Fragrancex';
import Thank from '../Vendorenrolment/Thank';

const Rootlayout = ({ children }) => {
  const navigate = useNavigate();
  const { sideBarOpen } = useContext(AppContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      navigate('/signin');
    } else {
      const currentTime = Date.now();
      const expiryTime = token.exp * 1000; // Convert to milliseconds
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

      if (currentTime >= expiryTime || expiryTime - currentTime < thirtyMinutesInMilliseconds) {
        // Token expired or will expire within 30 minutes
        localStorage.removeItem('token'); // Remove the expired token from localStorage
        navigate('/signin'); // Redirect to sign-in page
      }
    }
  }, [navigate]);

  return (
    <>
      <div className="h-28 duration-200 ease-in-out z-1 bg-green-50">
        <Header />
        <div className="flex max-w-full">
          <Sidebar />
          <div className={` ${!sideBarOpen ? 'md:ml-16' : 'md:ml-64'} `}>
            <main className="py-4 flex-1 break-words">{children}</main>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/enrolment" element={<Enrolment />} />
        <Route path='/lipsey'   element={<Lipsey/>}/>
      <Route path='/fragrancex'   element={<Fragrancex/>}/>
      <Route path='/thank'   element={<Thank/>}/>

      </Routes>
    </>
  );
};

export default Rootlayout;
