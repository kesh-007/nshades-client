import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading,isloading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isloading(true)
    
  
    try {
      const response =  fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.status === 404) {
        alert('User does not exist');
        isloading(false)
      } else if (response.status === 200) {
        alert('A new password has been sent to your email. Please check your spam folder as well.');
        isloading(false)
      } else {
        alert('An error occurred. Please try again later.');
        isloading(false)

      }
    } catch (error) {
      //console.error('Error:', error);
      alert('An error occurred. Please try again later.');
      isloading(false)
    }

  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">Enter your email to receive instructions on how to reset your password.</p>
      
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isloading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <p>{loading ?'loading...':'Reset Password'}</p>
          </button>
    
        <p className="text-gray-600 text-sm mt-4">
          Remembered your password? <a href="/login" className="text-blue-500">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;