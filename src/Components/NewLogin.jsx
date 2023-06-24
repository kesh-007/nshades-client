import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function NewLogin() {
  const [isUsersSelected, setIsUsersSelected] = useState(true);
  const [isVendorsSelected, setIsVendorsSelected] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const signUp = () => {
    if (password != confirmPassword) 
    {
      alert("Passwords don't match")
      return; 
    }
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    //const signupEndpoint = isUsersSelected ? 'https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/signup-user' : 'https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/signup-vendor';

    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/signup-vendor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:username,
        password:password,
        
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('email',username)
        const expiration = new Date().getTime() + 12 * 60 * 60 * 1000;
        localStorage.setItem("exptime", expiration);
        window.location.reload()

         // handle the response data
        // Perform any necessary navigation or display success message
      })
      .catch(error => {
        console.error('Error:', error);
        // Display error message or handle error
      });
  };


  const selectUsers = () => {
    setIsUsersSelected(true);
    setIsVendorsSelected(false);
  };

  const selectVendors = () => {
    setIsUsersSelected(false);
    setIsVendorsSelected(true);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevValue) => !prevValue);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevValue) => !prevValue);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - SVG */}
      <div className="w-1/2 bg-gradient-to-b from-[#FFA500] via-[#f2b84b] to-[#FFFFFF] flex items-center justify-center max-md:hidden">
        {/* Add your SVG here */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-16 w-16 text-white"
        >
          {/* Your SVG content */}
        </svg>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white max-md:w-full">
        <div className=" text-center py-12">
          <p className="text-4xl mb-3">Sign Up</p>
          <p className="text-gray-600">Welcome to our platform. We're excited to have you join our community.</p>
        </div>
        <div className="w-4/5">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full h-12 px-4 py-2 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="w-full h-12 px-4 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
              {isPasswordVisible ? (
                <RiEyeOffFill size={20} onClick={togglePasswordVisibility} />
              ) : (
                <RiEyeFill size={20} onClick={togglePasswordVisibility} />
              )}
            </span>
          </div>
          <div className="relative mb-4">
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full h-12 px-4 py-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
              {isConfirmPasswordVisible ? (
                <RiEyeOffFill
                  size={20}
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <RiEyeFill
                  size={20}
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </span>
          </div>
          <button
            onClick={signUp}
            className="w-full text-center text-white bg-[#F9A825]  hover:bg-orange-500 rounded-md py-2 mb-4"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-500 cursor-pointer text-center">
            Already have an account?{' '}
            <a href="/login">
              <span className="text-orange-400 ">Login</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
