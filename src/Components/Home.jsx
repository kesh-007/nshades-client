import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Card from './Cards';
import AdUnit from './AdUnit';
import Fuse from 'fuse.js';
import Iframe from 'react-iframe';
import toast, { Toaster } from 'react-hot-toast';



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


  useEffect(() => {
    const hasDisplayedToast = localStorage.getItem('hasDisplayedToast');
    if (!hasDisplayedToast) {
      toast.info('We are experiencing high traffic in the application. Please hold on and stay calm. If the data is not loading, please refresh the page.');
      localStorage.setItem('hasDisplayedToast', true);
    }
  }, []);


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
      <Toaster/>
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
      <p className='mt-[2.5rem] text-gray-600 ml-3'>ADVERTISEMENT</p>
      <div className='flex mt-[rem] mb-3'>
        <div>
      <a
        href="https://www.amazon.in/Apple-MacBook-Chip-13-inch-256GB/dp/B08N5W4NNB?keywords=Macbook&qid=1687759226&s=computers&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=li2&tag=keshavbaskar-21&linkId=31c2be18ea753979f74c75aabf295fd9&language=en_IN&ref_=as_li_ss_il"
        target="_blank"
      >
        <img
          border="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08N5W4NNB&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
          alt="Product Image"
        />
      </a>
      <img
        src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B08N5W4NNB"
        width="1"
        height="1"
        border="0"
        alt=""
        style={{ border: 'none !important', margin: '0px !important' }}
      />
      </div>
      <div>
      <a href="https://www.amazon.in/HP-Micro-Edge-Anti-Glare-15s-fq5111TU/dp/B0B6F5V23N?keywords=hp+laptop+i5+12th+generation&qid=1687759954&s=computers&sprefix=hp+%2Ccomputers%2C362&sr=1-3&linkCode=li2&tag=keshavbaskar-21&linkId=af4b515e24c2b37fe1ce00749a0cddff&language=en_IN&ref_=as_li_ss_il" target="_blank">
        <img
          border="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0B6F5V23N&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
          alt="Amazon Ad"
        />
      </a>
      <img
        src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0B6F5V23N"
        width="1"
        height="1"
        border="0"
        alt=""
        style={{ border: 'none !important', margin: '0px !important' }}
      />

      </div>
      <div>
      <a href="https://www.amazon.in/Samsung-Storage-MediaTek-Octa-core-Processor/dp/B0BMGB3CH9?crid=3IXBAJ166V05T&keywords=samsung&qid=1687764340&sprefix=samsun%2Caps%2C358&sr=8-4&linkCode=li2&tag=keshavbaskar-21&linkId=8b92ec07d1a138e31c898d6d2496dcaa&language=en_IN&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0BMGB3CH9&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0BMGB3CH9"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none', margin: '0' }}
/>

      </div>
      <div>
      <a href="https://www.amazon.in/Redmi-Mystique-AMOLED-Snapdragon%C2%AE-Triple/dp/B0BQ3PYMCZ?crid=6V1JAQAZGXFJ&keywords=redmi&qid=1687764627&sprefix=redmi%2Caps%2C367&sr=8-8&linkCode=li2&tag=keshavbaskar-21&linkId=242e91596cedc99c53ed9237b1f250c8&language=en_IN&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0BQ3PYMCZ&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0BQ3PYMCZ"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none', margin: '0' }}
/>


      </div>
      <div>
      <a href="https://www.amazon.in/YAMA-Electrical-Emergency-Screwdriver-Accessories/dp/B0C37592VS?keywords=electrical+set&qid=1687764696&sprefix=electrical+set%2Caps%2C299&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=li2&tag=keshavbaskar-21&linkId=e0f53d79536efe4c79027a7b3bcb7626&language=en_IN&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0C37592VS&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0C37592VS"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none', margin: '0' }}
/>


      </div>
      <div>
      <a href="https://www.amazon.in/Shocknshop-Analogue-Black-Stainless-W219/dp/B07RXZPMZ8?keywords=metal+watch&qid=1687760290&sr=8-16&linkCode=li2&tag=keshavbaskar-21&linkId=a67fdc9f1fa53ee66dc73fd364094128&language=en_IN&ref_=as_li_ss_il" target="_blank">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07RXZPMZ8&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt="Amazon Ad"
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B07RXZPMZ8"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none !important', margin: '0px !important' }}
/>

      </div>
      <div>
      <a href="https://www.amazon.in/Zebronics-Bluetooth-Calling-Assistant-Fitness/dp/B0B2JGQ9TT?keywords=metal+watch&qid=1687760290&sr=8-27&linkCode=li2&tag=keshavbaskar-21&linkId=c4e59419fd9ba210ea665f4878f848ec&language=en_IN&ref_=as_li_ss_il" target="_blank">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0B2JGQ9TT&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt="Amazon Ad"
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0B2JGQ9TT"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none !important', margin: '0px !important' }}
/>

      </div>
      <div>
      <a href="https://www.amazon.in/Airdopes-141-Bluetooth-Wireless-Playtime/dp/B09N3XMZ5F?crid=2C7GSRWH598O9&keywords=airpods&qid=1687760441&refinements=p_89%3AboAt&rnid=3837712031&s=electronics&sprefix=airpod%2Caps%2C291&sr=1-1&linkCode=li2&tag=keshavbaskar-21&linkId=4a5d9c9122698e67f71ec7f5440b4eb2&language=en_IN&ref_=as_li_ss_il" target="_blank">
        <img
          border="0"
          src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09N3XMZ5F&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
          alt="Amazon Ad"
        />
      </a>
      <img
        src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B09N3XMZ5F"
        width="1"
        height="1"
        border="0"
        alt=""
        style={{ border: 'none !important', margin: '0px !important' }}
      />
      </div>
      </div>
      <div className='flex justify-end'>
        <a href='https://amzn.to/3NKlyQn' target="_blank"><button className='text-white bg-blue-500 hover:scale-110 rounded-md p-2'>More</button></a>
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
