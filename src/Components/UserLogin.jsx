import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function UserLogin() {
  const [isUsersSelected, setIsUsersSelected] = useState(false);
  const [isVendorsSelected, setIsVendorsSelected] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const signIn = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  
    let loginEndpoint = '';
    if (isUsersSelected) {
      console.log('Users');
      loginEndpoint = 'https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/login-user';
    } else {
      console.log('Vendors');
      loginEndpoint = 'https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/login-vendor';
    }
  
    // Create the request body
    const requestBody = {
      email: username,
      password: password
    };
  
    // Make the POST request to the appropriate login endpoint
    fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('Invalid email or password');
        } else {
          throw new Error('Login failed');
        }
  

      })
      .then((data)=>{
        try {
          localStorage.setItem('user',data.user)
          const expiration = new Date().getTime() + 12 * 60 * 60 * 1000;
          localStorage.setItem("exptime", expiration);
          localStorage.setItem('email',username)
  
          window.location.reload()
          
        } catch (error) {
          
        }
      })
      .catch(error => {
        alert("Login failed")
        console.error('Error:', error);
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

  const navigateToCreateAccountPage = () => {
    // Perform navigation logic to the create account page
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevValue) => !prevValue);
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

    {/* Right Side - Login Form */}
    <div className="w-1/2 flex flex-col justify-center items-center bg-white max-md:w-full">
      <div className="text-xl text-center py-12">
        <p className="text-4xl mb-3">Login</p>
        <p className="text-xl text-gray-600">Welcome Back</p>
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
         <button
          onClick={signIn}
          className="w-full text-center text-white bg-[#F9A825] hover:bg-orange-500 rounded-md py-2 mb-4"
        >
          Login
        </button>
        <a href='/forgot-password'>
        <p className='flex justify-end text-gray-500'>forgot password?</p>
        </a>
        <p className="text-sm text-gray-500 cursor-pointer mt-[1rem] text-center">
          New User?
         <a href='/createaccount'> <span className="text-orange-400"> Signup</span>
         </a>
        </p>
      </div>
    </div>
  </div>
  );
}

export default UserLogin;
