import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 404) {
        alert('User does not exist');
      } else if (response.status === 200) {
        if (retryCount < 2) {
          setRetryCount(retryCount + 1);
          throw new Error('Retry');
        } else {
          alert('A new password has been sent to your email. Please check your spam folder as well.');
        }
      } else {
        throw new Error('An error occurred.');
      }
    } catch (error) {
      if (error.message === 'Retry') {
        alert('Please try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
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
          disabled={loading}
          className={
            loading
              ? "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              : "bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          }
        >
          <p>{loading ? 'Loading...' : 'Reset Password'}</p>
        </button>
    
        <p className="text-gray-600 text-sm mt-4">
          Remembered your password? <a href="/login" className="text-blue-500">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
