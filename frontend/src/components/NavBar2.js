import React from "react";
import { MapPin } from 'lucide-react';

function NavBar2({ user, onLogout }) {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="w-full px-6 py-7">
        <div className="flex justify-between items-center max-w-none">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
              <MapPin size={20} />
            </div>
            <h1 className="text-4xl font-black tracking-wider text-white drop-shadow-lg mb-1.8 leading-tight"
                  style={{ 
                    fontFamily: "'Impact', 'Arial Black', 'Franklin Gothic Bold', sans-serif",
                    fontWeight: '900',
                    letterSpacing: '1.5px',
                  }}>
                PETRAKSHAK
              </h1>
          </div>
          
          <div className="flex space-x-3">
            <a 
              href="/" 
              className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Home
            </a>
            
            <a 
              href="/ReportCase" 
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Report Case
            </a>
            
            <a 
              href="/rescue-team/dashboard" 
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Rescue Team
            </a>
            
            {user ? (
              <>
                <a 
                  href="/volunteer/dashboard" 
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Dashboard
                </a>
                <button 
                  onClick={onLogout}
                  className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <a 
                href="/volunteer/login" 
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Volunteer Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar2;