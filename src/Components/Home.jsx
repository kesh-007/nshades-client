import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Card from './Cards';
import AdUnit from './AdUnit';
import Fuse from 'fuse.js';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [profile, setProfile] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const navigate = useNavigate();

  const handleMoreOptionsClick = () => {
    setShowPopup(true);
  };

  const handleReportClick = () => {
    setShowPopup(false);
    setShowReportModal(true);
  };

  const handleLikeClick = (profileId) => {
    if (likedProfiles.includes(profileId)) {
      setLikedProfiles(likedProfiles.filter((id) => id !== profileId));
    } else {
      setLikedProfiles([...likedProfiles, profileId]);
    }
  };

  useEffect(() => {
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-services')
      .then((response) => response.json())
      .then((data) => {
        // Create a new array and sort the "likes" column in descending order
        setProfile(data);
      })
      .catch((error) => console.log(error));
  }, []);
    
  const fuseOptions = {
    keys: ['description', 'address'],
  };

  const fuse = new Fuse(profile, fuseOptions);
  const filteredCards = fuse.search(`${searchTerm} ${location}`).filter((data) => {
    const card = data.item;
    const cardDescription = card.description || '';
    const cardLocation = card.address || '';
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const lowercaseLocation = location.toLowerCase();
  
    if (searchTerm && location) {
      return (
        cardDescription.toLowerCase().includes(lowercaseSearchTerm) &&
        cardLocation.toLowerCase().includes(lowercaseLocation)
      );
    } else if (searchTerm) {
      return cardDescription.toLowerCase().includes(lowercaseSearchTerm);
    } else if (location) {
      return cardLocation.toLowerCase().includes(lowercaseLocation);
    }
    
    // If neither searchTerm nor location is provided, include all cards
    return true;
  });
  
  return (
    <div>
      <NavBar />
      <div className="flex items-center mt-[2rem] ml-2 mr-2">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-4">
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-blue-500  w-auto"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="justify-start ml-[2rem] max-md:flex-col max-md:ml-0 mt-[1rem] max-md:mt-0">
        {filteredCards.map((data) => (
          <div className="mb-2">
            <Card
              profileImage={data.item.profile_image}
              coverImage={data.item.cover_image}
              name={data.item.name}
              description={data.item.description}
              phoneNumber={data.item.phone_number}
              likes={data.item.likes}
              address={data.item.address}
              email={data.item.email}
            />
            <AdUnit />
          </div>
        ))}
        {filteredCards.length === 0 && (
          <p className="text-center mt-[2rem] text-gray-600">No results to show</p>
        )}
      </div>
    </div>
  );
}

export default Home;
