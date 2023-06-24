import React from 'react';
import { FaHeart, FaPhone,FaThumbsUp } from 'react-icons/fa';

function Card({ profileImage, coverImage, name, description, phoneNumber, address, likes,email }) {
  let likes_ = likes || 0
  return (
    <div className="max-w-[30rem] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
        <h2 className="text-xl font-bold">{name}</h2>

        <div className="flex items-center space-x-4">
          <a href={`tel:${phoneNumber}`} className="text-blue-500">
            <FaPhone />
          </a>
        </div>
      </div>
      <img src={coverImage} alt="Cover" className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-500">{description}</p>
        <p className="text-gray-500">{address}</p>
        <p className="text-gray-500">Phone: {phoneNumber}</p>
        <div className='flex justify-between'>
        <div className="flex items-center mt-4  rounded-sm">
        <button  className={'p-2 bg-green-400 text-white rounded-md '} >
          
          <div className='flex'>
            <FaThumbsUp className='mr-2 mt-1'/>{likes_}

          </div>
          </button>
        </div>
        <div>
          <a href={`/${email}`}>
            <p className='mt-4 py-2 px-[1.3rem] bg-orange-500 text-white rounded-3xl hover:scale-110 '>
            View
            </p></a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
