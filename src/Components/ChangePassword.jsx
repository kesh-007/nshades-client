import React, { useState } from 'react';
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(oldPassword===newPassword)
    {
        alert("Passwords cannot be same")
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          currentPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setIsSuccess(true);
        setErrorMessage('');
        // Handle success
      } else {
        setIsSuccess(false);
        setErrorMessage(data.message);
        // Handle error
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setErrorMessage('An error occurred. Please try again.');
      // Handle error
    }

    setIsLoading(false);
    setNewPassword('')
    setOldPassword('')
  };

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible((prevValue) => !prevValue);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevValue) => !prevValue);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white shadow-md rounded-md p-6 max-md:w-full">
        <h2 className="text-2xl text-center font-bold mb-4">
          <RiLockPasswordLine className="inline-block text-4xl mb-1" />
          Change Password
        </h2>
        {isSuccess && (
          <div className="bg-green-100 text-green-600 p-4 rounded-md mb-4">
            Password changed successfully!
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block mb-1">
              Old Password
            </label>
            <div className="relative">
              <input
                type={isOldPasswordVisible ? 'text' : 'password'}
                id="oldPassword"
                className="w-full h-10 px-3 rounded border-gray-300 border focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                {isOldPasswordVisible ? (
                  <RiEyeOffFill
                    size={20}
                    onClick={toggleOldPasswordVisibility}
                    className="text-gray-500"
                  />
                ) : (
                  <RiEyeFill
                    size={20}
                    onClick={toggleOldPasswordVisibility}
                    className="text-gray-500"
                  />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={isNewPasswordVisible ? 'text' : 'password'}
                id="newPassword"
                className="w-full h-10 border px-3 rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                {isNewPasswordVisible ? (
                  <RiEyeOffFill
                    size={20}
                    onClick={toggleNewPasswordVisibility}
                    className="text-gray-500"
                  />
                ) : (
                  <RiEyeFill
                    size={20}
                    onClick={toggleNewPasswordVisibility}
                    className="text-gray-500"
                  />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
