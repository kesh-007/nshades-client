import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router

import mySvg from '../Assets/mysvg.svg';
import LoginPage from './LoginPage';

function LandingPage() {
  const history = useNavigate();

  const navigateToLogin = () => {
    history('/login');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="aspect-w-1 aspect-h-1 mb-10">
        <img src={mySvg} alt="SVG" />
      </div>
      <h1 className="text-4xl font-bold mt-3">Connecting You to Trusted Local Services</h1>
      <p className="text-sm text-gray-500 mt-[3rem]">
        Discover, Connect, and Experience a World of Local Services at Your Fingertips
      </p>
      <button
        className="mt-6 w-full ml-2 mr-2 p-2 bg-orange-400 text-white rounded-lg text-lg font-bold"
        onClick={navigateToLogin}
      >
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;

