import React, { useState } from 'react';

const Enquiry = ({toemail}) => {
    console.log(toemail.email)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    number:'',
    toemail:toemail.email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name ||!formData.email || !formData.message)
    {
      alert("Fill the fields to submit")
      return;
    }
    // Make a POST request to the API endpoint
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/post-enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        console.log(response)
        return response.json()
    }).then((data)=>{
        if(data.status==='ok'){
            alert("Message posted sucessfully")
    }})
      
      
      .catch((error) => {
        console.error('Error:', error);
      });

       setFormData({
        name: '',
        email: '',
        message: '',
        number:'',
        toemail:toemail.email
      });
  };    

  return (
    <form  className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-gray-700">
          Number:
        </label>
        <input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-600"
        />
      </div>
     
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 text-gray-700">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-600"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default Enquiry;
