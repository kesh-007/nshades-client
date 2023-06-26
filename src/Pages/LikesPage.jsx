import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import Example from '../Components/NavBar';
import { fadeIn } from 'react-animations';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';


const LikesPage = () => {
  const email = localStorage.getItem('email');
  const [likes, setLikes] = useState([]);
  const navigation = [
    { name: 'Enquiries', href: '/dashboard/enquires', current: false },
    { name: 'Likes', href: '/dashboard/likes', current: true },
  ];

  const getLikes = () => {
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-likes-dashboard', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => setLikes(data));
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <Example thisnavigation={navigation} />

      <h1 className="text-center text-3xl mb-[3rem] mt-[2rem]">Likes</h1>

      <div className="flex items-center justify-center mt-8">
        {likes.map((like) => (
          <div
            className={classNames('bg-white', 'p-4', 'rounded-lg', 'shadow-lg', 'm-4', {
              animated: true,
              fadeIn: true,
            })}
            key={like.id}
          >
            <p className="text-lg font-bold">{like.user_email}</p>
            <div className="flex items-center justify-center mt-2">
              <FiHeart className="text-red-500 mr-2" />
              <span>{like.likes}</span>
            </div>
          </div>
        ))}
        {likes.length===0 && <h1>No user liked your profile</h1>}
      </div>
      <Helmet className='mt-[3rem]'>
        <script async="async" data-cfasync="false" src="//pl19854220.highrevenuegate.com/f198cd473bf0abf18d5001f1b3f8e693/invoke.js"></script>
</Helmet>
<div id="container-f198cd473bf0abf18d5001f1b3f8e693"></div>

    </div>
  );
};

export default LikesPage;
