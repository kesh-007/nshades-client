import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEllipsisH, FaThumbsUp,FaWhatsapp,FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Enquiry from './Enquiry';

function HomeProfile() {

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const[needtofetch,setneedtofetch] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name,setName] =  useState('')
  const [total,setTotal] = useState(0)
  const [showModalProfile,setShowModalProfile] = useState(false)


  const email = useParams()
  const handleMoreOptionsClick = () => {
    setShowPopup(true);
  };

  const handleReportClick = () => {
    setShowPopup(false);
    setShowReportModal(true);
  };

  const handleReportConfirm = () => {
    setShowReportModal(false);
  };

  const handleReportCancel = () => {
    setShowReportModal(false);
  };

  const handleReport = () => {
    // Logic for reporting the comment
    // You can implement the desired functionality here
    console.log('Comment reported');
    // Close the modal after reporting
    setShowModal(false);
  };
  const handleReportProfile = () => {
    setShowModalProfile(false)
  }

  const [data, setData] = useState([]);
  const [expertise,setExpertise] = useState(false)
  const myemail = localStorage.getItem('email')

  useEffect(() => {
    console.clear()
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-profile', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email:email.email
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        if (data) {
          setName(data[0].name);
          setExpertise(true)
          
          
        }

      
      
        
      });
  }, []);

  

  useEffect(()=>{
    needComments()

  },[])
  function needComments()
  {
    fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-comments',{
      method:"POST",
      headers:{"Content-type":'application/json'},
      body:JSON.stringify({email})
    })
    .then(response=>response.json())
    .then(data=>setComments(data))

  }
  const navigate = useNavigate()
  
  const handleCommentSubmit = () => {
    if(!myemail)
    {
      alert("Please login to post comment")
     navigate('/login')
     return; 
    }
    if (comment.trim() !== '') {
      fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/post-comment',{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
          myemail:myemail,
          toemail:email,
          content:comment
        })
      })
setComment('')
needComments()
setneedtofetch(true)
      
    }


  };
  if (needtofetch===true)
{
  needComments()
  setneedtofetch(false)
}
const [isliked,setIsliked] = useState(false)
useEffect(()=>{
  console.clear()
  isLiked()
  getTotalLikes()

},[isliked])


function getTotalLikes()
{
  fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-likes',{
    method:"POST",
    headers:{"Content-type":'application/json'},
    body:JSON.stringify({email})
  })
  .then(response=>response.json())
  .then(data=>setTotal(data.total))


}


function isLiked()
{
  fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/is-liked',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      user_email:myemail,
      post_email:email
    })
  }).then(response=>response.json())
  .then(data=>{if(data.length>0)
  {
    setIsliked(true)

  }
  else
  {
    setIsliked(false)
  }
})
  

}

function AddLike()
{
  if(!myemail)
  {
    alert("Please login to like")
    navigate('/login')
    return;
  }

  fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/add-like',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      user_email:myemail,
      post_email:email
    })
  }).then(response=>response.json())
  setIsliked(!isliked)


}


function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} `;
}
function redirectToWhatsApp(number) {
  const message = encodeURIComponent("Hello, I checked out your profile via Nshades!");
  const phoneNumber = number; // Replace with the desired phone number

  // Construct the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Redirect to WhatsApp
  window.location.href = whatsappUrl;
}
useEffect(() => {
  document.title = `${name} | Nshades`;
  if (name===null)
  navigate("profile/pagenotfound")
   // Set the desired title for the specific page
  return () => {
    //document.title = 'Default Title'; // Reset the title when the component unmounts
  };
}, [name]);




  return (
    <div>
{name && name != 'Vendor' &&    <div className="mobile-profile-page">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white">

        <div></div>
        <h1 className="text-xl font-bold mt-8">Profile</h1>
        <div className='flex justify-end mt-[2rem] cursor-pointer'>
        {/* <FaEllipsisH onClick={handleMoreOptionsClick}/> */}

      </div>
        
      </div>
     

      
      {data.map((datum, index) => (
  <div key={index}>
    {/* Profile Avatar and Name */}
    <div className="flex flex-col items-center p-4">
      <img
        src={datum.profile_image}
        alt="Profile Avatar"
        className="w-[12rem] h-[12rem] rounded-full"
      />
      <h2 className="text-lg font-bold mt-2">{datum.name}</h2>
      
      <p className="text-gray-600">{datum.description}</p>
    </div>

    {/* Images Section */}
    <div className="p-4">
      <h4 className="text-lg font-bold mb-2">Images</h4>
      <div className="flex overflow-x-auto p-4">
        <img src={datum.cover_image} className="w-[49%] h-5rem rounded-lg mr-2"/>
        <img src={datum.other_image1} className="w-[49%] h-5rem rounded-lg ml-2"/>

        </div>
    </div>

    {/* Services Section */}
    <div className="p-4">
      <h4 className="text-lg font-bold mb-2">Services</h4>
      <div className="bg-gray-50 text-white p-4 flex">

      {
        datum.expertise && datum.expertise.split(';').map((item)=>(
          <h3 className="text-lg font-bold bg-orange-500 px-2 py-1 rounded mr-2 hover:scale-105">{item}</h3>
  
        ))
      } 
      </div>


      {/* Render services */}
    </div>

    {/* Working Hours Table */}
    <div className="p-4 w-[100%] items-center justify-center">
      <h4 className="text-lg font-bold mb-2">Working Hours</h4>
      <table className="w-full text-center">
        <tbody>
          {datum.working_hours &&
            datum.working_hours.split(';').map((item, index) => {
              const [day, hours] = item.split(' -> ');
              return (
                <tr key={index}>
                  <td className="border border-gray-300 py-2 px-4">{day}</td>
                  <td className="border border-gray-300 py-2 px-4">{hours}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>

    {/* Prices Table */}
    <div className="p-4 w-1/2">
  <h4 className="text-lg font-bold mb-2">Contact</h4>
  <p className="text-gray-600 mb-2">Mobile Number: {datum.phone_number}</p>
  <p className="text-gray-600 mb-2">Email: {datum.email}</p>
  <p className="text-gray-600 mb-2">Address: {datum.address}</p>
  <div className='flex mt-1'>
      {datum.wpokay &&
  <button className='flex p-2 bg-green-500 mr-2 text-white hover:scale-110 rounded-md' onClick={()=>redirectToWhatsApp(datum.phone_number)}><FaWhatsapp className='mt-1 mr-2'/>Message</button>
      }
  {datum.url &&
  <a href={`${datum.url}`}> 
     <button className='flex p-2 bg-green-500 text-white hover:scale-110 rounded-md' ><FaMapMarkerAlt className='mt-1 mr-2'/>Locate</button>
  </a>

}



  </div>

  

</div>
<div className='ml-2 h-auto w-auto  mt-2 mb-2'>
<h4 className="text-lg font-bold mb-2">About Us</h4>
  <pre>{datum.more}</pre>
  </div>
  </div>
))}

      {}

      {/* Add Comment Section */}
      <div className='flex max-md:flex-col'>

      <div className="p-4 w-[60%] max-md:w-full">
        <div className='flex justify-between mb-3'>
        <h4 className="text-lg font-bold mb-2">Comments</h4>
        <button onClick={AddLike} className={isliked ?'p-2 bg-green-400 text-white rounded-md hover:scale-105':'p-2 bg-gray-100 rounded-md hover:scale-105'} >
          
          <div className='flex'>
            <FaThumbsUp className='mr-2 mt-1'/>{total}

          </div>
          </button>
        </div>
        <div className='ml-4 mr-4'>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a comment"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 "
            onClick={handleCommentSubmit}
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
        {comments.map((comment) => (
        <li key={comment.id}>
          <p className="text-gray-700">
            {comment.user_email} <span className='text-gray-400'>{formatDate(comment.created_at)}</span>
          </p>
          <div className="flex items-center space-x-2 justify-between">
            <p>{comment.comment_text}</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-500 hover:text-gray-700 hover:text-2xl"
            >
              <p className='text-xl'>...</p>
            </button>
          </div>
        </li>
        
      ))}
      {comments.length===0 && <p className='text-gray-600'>No comments available.</p>}
            {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Report Comment</h2>
            <p>Do you want to report this comment?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

        </ul>
        
      </div>
      </div>
      <div className='ml-3 w-[40%] mt-[2rem] bg-gray-100 h-[35rem] max-md:w-full mr-4 shadow-lg rounded-md'>
      <h4 className="text-lg font-bold mb-2 text-center">Enquire Now</h4>
        <Enquiry toemail={email}/>
      </div>
      </div>

      {/* Popup and Report Modal */}
      {showModalProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Report Account</h2>
            <p>Do you want to report this comment?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModalProfile(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>}
    {name==='Vendor' || expertise===false && <p className='text-center text-xl mt-[3rem]'>Profile is not updated for listing</p>}
    </div>
  );
}

export default HomeProfile;
