import React, { useState,useEffect } from 'react';
import {
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { FiEye, FiEyeOff, FiMinus, FiArrowLeft, FiPlus, FiEdit, } from 'react-icons/fi';
import {FaImage,FaPlus} from 'react-icons/fa'
import { db, storage } from '../FireBase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditVProfile = () => {
  const email1 = localStorage.getItem('email');
  console.log("Which user",email1)

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workingHours, setWorkingHours] = useState([]);
  const [day, setDay] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [otherImages, setOtherImages] = useState([]);
  const [url, setUrl] = useState('');
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [otherImagePreviews, setOtherImagePreviews] = useState(null);
  const [more ,setMore] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(true);
  const [showToast,setShowToast] = useState(false)
  const navigate = useNavigate()
  const [checkme ,setcheckme] = useState(true)
  const [adddata1,setadddata1] = useState('')
  const [adddata2,setadddata2] = useState('')
let data;
  useEffect(() => {
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-profile', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'email':email1
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        
        setFullName(data[0].name)
        
        setProfilePreview(data[0].profile_image)
       
        setEmail(data[0].description)
        if (data[0].phone_number)
        setPhoneNumber(data[0].phone_number.replace('+91',''))
        setMore(data[0].more)
        setLocation(data[0].address)
        setUrl(data[0].url)
        setCoverPreview(data[0].cover_image)
        setOtherImagePreviews(data[0].other_image1)
        console.log(data[0].other_image1,'\n shuuu')
        setadddata1(data[0].expertise)
        setadddata2(data[0].workingHours)
        if (data[0].expertise)
        setcheckme(false)        
        
        
      
      
        console.log("Shobba", data);
      });
  }, []);




  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleAddWorkingHours = () => {
    const newWorkingHour = { day, timeRange };
    setWorkingHours([...workingHours, newWorkingHour]);
    setDay('');
    setTimeRange('');
  };



  const handleWorkingHoursChange = (index, field, value) => {
    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours[index][field] = value;
    setWorkingHours(updatedWorkingHours);
  };

  const handleRemoveWorkingHour = (index) => {
    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours.splice(index, 1);
    setWorkingHours(updatedWorkingHours);
  };

  const handleAddService = () => {
    const newService = { name: serviceName };
    setServices([...services, newService]);
    setServiceName('');
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };
  const showMyToast   = (cond) =>
  {
    if (showToast)
    {
   // toast.loading("Saving data...")
    }
  }

  const handleOtherImageUpload = (e) => {
    const file = e.target.files[0];
    setOtherImages(file);
    setOtherImagePreviews(URL.createObjectURL(file))
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));

  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));

  };

  const handleSave = async () => {
    console.log("hereee",checkme,isChecked)
    if(checkme===false)
{
  console.log("here")
  setIsChecked(!isChecked)
  console.log("NOw is is checked",isChecked)

}

    if(!fullName)
    {
      alert("Please fill the required fields to proceed.")
      return
    }
    
    if (!isChecked && checkme===true)
    {
      alert("Please accept the terms and conditions before saving.")
      return
    }
    if (!profilePreview)
    {
      alert('Please upload a profile image before saving.')
      return;
    }

    const badWords = ["rape", "fuck", "sex","porn"]; // Replace with your list of bad words

const hasBadWords = services.some((expertise) => {
  const expertiseName = expertise.name.toLowerCase();
  return badWords.some((badWord) => expertiseName.includes(badWord.toLowerCase()));
});

if (hasBadWords) {
  // Handle the presence of bad words in services
  alert("Please use alternative words for these services.")
  return;
}
    setShowToast(true)
    showMyToast()
    let profileUrl = profilePreview;
    let coverUrl = coverPreview;
    let otherUrl = otherImagePreviews;
    console.log("profile",profileUrl,coverUrl,otherUrl)

    try {
      if (profileImage) {
        const profileStorageRef = ref(storage, `images/${profileImage.name}`);
        const profileUploadTask = uploadBytesResumable(profileStorageRef, profileImage);
        const profileSnapshot = await profileUploadTask;
        profileUrl = await getDownloadURL(profileSnapshot.ref);
      }

      if (coverImage) {
        const coverStorageRef = ref(storage, `images/${coverImage.name}`);
        const coverUploadTask = uploadBytesResumable(coverStorageRef, coverImage);
        const coverSnapshot = await coverUploadTask;
        coverUrl = await getDownloadURL(coverSnapshot.ref);
      }

      if (otherImages) {
        const otherStorageRef = ref(storage, `images/${otherImages.name}`);
        const otherUploadTask = uploadBytesResumable(otherStorageRef, otherImages);
        const otherSnapshot = await otherUploadTask;
        otherUrl = await getDownloadURL(otherSnapshot.ref);
      }
    } catch (error) {
      console.error(error);
      alert('Error: Please try again later.');
    }

    const expertiseNames = services.map((expertise) => expertise.name).join(';');
    const timeRanges = workingHours.map((workingHour) => `${workingHour.day} -> ${workingHour.timeRange}`).join(';');

    const profileData = {
      name: fullName,
      email,
      address: location,
      phone_number: '+91'+phoneNumber,
      workingHours: timeRanges,
      expertise: expertiseNames,
      profileImage: profileUrl,
      coverImage: coverUrl,
      otherImages: otherUrl,
      myemail: email1,
      url,
      more,
      wpokay:isChecked1
    };

    // Send the profile data to the backend API
   const myPromise =   fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/edit-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Profile data saved successfully');
          setShowToast(false)
          showMyToast()
          toast.success("Profile Saved Sucessfully")

        } else {
          console.error('Error saving profile data');
        }
      })
      .catch((error) => {
        console.error('Error saving profile data: ', error);
      });
      
  
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  return (
    <div>
      <Toaster/>

    <div className="flex flex-col items-center justify-between bg-gray-900 p-4">
      <div></div>
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
      </div>
      <div>
        <p></p>
      </div>
    </div>
    <div className="flex flex-col items-center my-4">
      <div className="relative rounded-full bg-gray-300 p-1">
        <div className="bg-white rounded-full overflow-hidden w-24 h-24">
          {/* Profile picture */}
          { profilePreview ? (
            <>
              <label htmlFor="profileImageInput">
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer"
                />
              </label>
              <input
                id="profileImageInput"
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfileImage}
              />
            </>
          ) : (
            <>
              <label htmlFor="profileImageInput">
                <p className="text-5xl ml-6 mt-5 cursor-pointer text-gray-600">
                  <FaImage />
                </p>
              </label>
              <input
                id="profileImageInput"
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfileImage}
              />
            </>
          )}
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <span className="text-gray-600 text-sm cursor-pointer">
              <FaPlus />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4">
      
      <TextField
        type="text"
        label="Full Name"
        required
        className="mb-3 w-1/2"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <div className='mt-3'/>
      < p className='text-gray-500 mb-1'>
      Enter a compelling description using relevant keywords for better search results
      </p>
            <TextField
        type="text"
        label="Description"
        className="mb-3 w-1/2"
        multiline
        rows={3}
        
        value={email}
        placeholder='People will search you only by this description,use suitable words to describe your work'
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className='mt-3'/>
      <TextField
        type="text"
        label="More"
        className="mb-3 w-1/2"
        multiline
        rows={3}
        value={more}
        
        onChange={(e) => setMore(e.target.value)}
      />

      <div className='mt-3'/>
      <TextField
        type="text"
        label="Location"
        className="mb-3 w-1/2"
        
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <p className="text-sm text-gray-600 mt-5 mb-3">  
      Use Google Maps to find your working location. Simply search for your location, copy the URL, and share it with us. This ensures accurate display on your profile.
</p>
      <TextField
        type="text"
        label="Location URL"
        className="mb-3 w-1/2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      


      <div className='flex mt-3 mb-3'>
      <p className='p-2 bg-gray-100 mr-3 text-center text-gray-500'>+91</p>
      <TextField
        type="number"
        label="Phone Number"
        
        className="mb-3 w-[46%]"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      </div>
      <div className='mt-3'/>
      <label>
        <input
          type="checkbox"
          checked={isChecked1}
          className='mr-1'
          onChange={handleCheckboxChange1}
        />
        Use the same number to recieve whatsapp messages
        </label>
      <hr className='text-gray-500 mt-[3rem]'/>
      <h3 className="text-lg font-bold mt-[3rem] mb-[1rem]">Working Hours</h3>
      <ul className="mb-3">
        {workingHours.map((workingHour, index) => (
          <li key={index} className="flex items-center space-x-2 w-1/2 max-md:w-full">
            <TextField
              type="text"
              value={workingHour.day}
              onChange={(e) => handleWorkingHoursChange(index, 'day', e.target.value)}
              className="w-full"
            />
            <TextField
              type="text"
              value={workingHour.timeRange}
              onChange={(e) => handleWorkingHoursChange(index, 'timeRange', e.target.value)}
              className="w-full"
            />
            <button
              className="text-red-500"
              onClick={() => handleRemoveWorkingHour(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2 mb-3">
        <TextField
          type="text"
          label="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <TextField
          type="text"
          label="Time Range"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-1 px-2 max-md:text-sm"
          onClick={handleAddWorkingHours}
        >
          Add 
        </button>
      </div>
      <hr className='text-gray-500 mt-[3rem]'/>

      <h3 className="text-lg font-bold mt-[3rem]">Services</h3>
      <ul className="mb-3">
        {services.map((service, index) => (
          <li key={index} className="flex items-center space-x-2 w-1/3 max-md:w-full">
            <TextField
              type="text"
              value={service.name}
              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
              className="w-full"
            />
            <button
              className="text-red-500"
              onClick={() => handleRemoveService(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className='mb-2'>Add services to enter in listing</p>

      <div className="flex items-center space-x-2 mb-3">
        <TextField
          type="text"
          label="Service Name"
          value={serviceName}
          className='w-50'
          
          onChange={(e) => setServiceName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-1 px-2"
          onClick={handleAddService}
        >
          Add Service
        </button>
      </div>
      <div>
      <hr className='text-gray-500 mt-[3rem]'/>
      <h3 className="text-lg font-bold mt-[3rem] mb-[1rem]">Images</h3>

        <label htmlFor="coverImageInput">Cover Image</label>
        <input
          id="coverImageInput"
          type="file"
          accept="image/*"
          onChange={handleCoverImage}
        />
        {coverPreview && (
          <div>
            <img src={coverPreview} alt="Cover" className="w- h-auto mt-3" />
          </div>
        )}
        <div className='mt-3'/>
        <label htmlFor="otherImageInput">Other Image </label>
        <input
          id="otherImageInput"
          type="file"
          accept="image/*"
          onChange={handleOtherImageUpload}
        />
        {otherImagePreviews && (
          <div>
            <img src={otherImagePreviews} alt="Other" className="w-50 h-auto mt-3" />
          </div>
        )}
      </div>
{ checkme &&     <div className='mt-[2rem]'>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          className='mr-1'
          onChange={handleCheckboxChange}
        />
         I accept the <a href= '/terms-and-conditions' className='text-blue-400'>terms and conditions</a> 
        </label>
    </div>}
      <div className="flex justify-center mt-4">
        <Button variant="contained" onClick={handleSave}>
          <div className='flex'>
{    showToast &&      <CircularProgress color="inherit" className='text-white w-1 h-1' style={{ width: '20px', height: '20px',marginRight:"8px" }}/>
}
          <p className=''>Save</p>
          </div>
        </Button>
      </div>
    </div>
  </div>

  );
};

export default EditVProfile;
