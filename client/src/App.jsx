// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from './components/common/MainNavbar';
import LeftSidebar from './components/common/LeftSidebar';
import RightSidebar from './components/common/RightSidebar';
import CreateFAB from './components/common/CreateFAB'; 

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D0B14] text-white flex flex-col font-sans relative">
      <MainNavbar />

      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
        
        <LeftSidebar />

        <main className="col-span-1 md:col-span-2 space-y-6">
          <Outlet />
        </main>

        <RightSidebar />

      </div>

      <CreateFAB />
    </div>
  );
}