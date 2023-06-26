import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEllipsisH, FaThumbsUp,FaWhatsapp,FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Enquiry from './Enquiry';
import CircularProgress from '@mui/material/CircularProgress';


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
      <p className='mt-[2.5rem] text-gray-600 ml-3'>Buy Now</p>
      <div className='flex mt-[rem] mb-3'>
        <div>
        <a href="https://www.amazon.in/realme-Segment-Fastest-Charging-High-res/dp/B0BZ48H8JX?pd_rd_w=jrbCi&content-id=amzn1.sym.471a6bd7-a2cb-4fab-96e9-c9d4de97930b&pf_rd_p=471a6bd7-a2cb-4fab-96e9-c9d4de97930b&pf_rd_r=Q6Z9ANCWZWCJFGPMZS1D&pd_rd_wg=ergtS&pd_rd_r=73e494df-ffc2-4dbc-9692-cc6558ebf7b4&pd_rd_i=B0BZ48H8JX&psc=1&linkCode=li2&tag=keshavbaskar-21&linkId=97ed04580541cb5421227644a3221e5e&language=en_IN&ref_=as_li_ss_il" target="_blank">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0BZ48H8JX&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0BZ48H8JX"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none !important', margin: '0px !important' }}
/>

      </div>
      <div>
      <a href="https://www.amazon.in/Fashion-Frill-Jewellery-Vertical-Stainless/dp/B0BH8H9KSL?crid=13PFIZLVH44OT&keywords=chain&qid=1687763504&sprefix=chai%2Caps%2C432&sr=8-5&linkCode=li2&tag=keshavbaskar-21&linkId=dc6f4398a51fe205af2f677dcba93dcf&language=en_IN&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0BH8H9KSL&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0BH8H9KSL"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none', margin: '0' }}
/>


      </div>
      <div>
      <a href="https://www.amazon.in/Apple-iPhone-14-128GB-Blue/dp/B0BDK62PDX?crid=1F5W36EB3ANJ6&keywords=iphone&qid=1687764274&sprefix=ipho%2Caps%2C322&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=li2&tag=keshavbaskar-21&linkId=a7d7aaba2574367eb4aa1b556b6d92be&language=en_IN&ref_=as_li_ss_il" target="_blank" rel="noopener noreferrer">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0BDK62PDX&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B0BDK62PDX"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none', margin: '0' }}
/>


      </div>
      <div>
      <a href="https://www.amazon.in/UNEQUETREND-Fashion-Digital-Samurai-Simple/dp/B07R81QF8Z?keywords=metal+watch&qid=1687760290&sr=8-25&linkCode=li2&tag=keshavbaskar-21&linkId=4d475437f64ebb6a71ffa0cde6aba48d&language=en_IN&ref_=as_li_ss_il" target="_blank">
  <img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07R81QF8Z&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN" alt="" />
</a>
<img src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B07R81QF8Z" width="1" height="1" border="0" alt="" style={{ border: 'none !important', margin: '0px !important' }} />


      </div>
      <div>
      <a href="https://www.amazon.in/Redmi-Power-Black-128GB-Storage/dp/B09Y64H8VS?crid=1PE37Z95NBIQU&keywords=redmi+mobile&qid=1687763270&sprefix=redmi+mobi%2Caps%2C384&sr=8-2&linkCode=li2&tag=keshavbaskar-21&linkId=74a5e2d40bfb4fbeecb06208e9324626&language=en_IN&ref_=as_li_ss_il" target="_blank">
  <img
    border="0"
    src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09Y64H8VS&Format=_SL160_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=keshavbaskar-21&language=en_IN"
    alt=""
  />
</a>
<img
  src="https://ir-in.amazon-adsystem.com/e/ir?t=keshavbaskar-21&language=en_IN&l=li2&o=31&a=B09Y64H8VS"
  width="1"
  height="1"
  border="0"
  alt=""
  style={{ border: 'none !important', margin: '0px !important' }}
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
      </div>
      <div className='flex justify-end'>
        <a href='https://amzn.to/3NKlyQn' target="_blank"><button className='text-white bg-blue-500 hover:scale-110 rounded-md p-2'>More</button></a>
        </div>
      

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
    {name==='Vendor' || expertise===false && <div className='text-center text-xl mt-[3rem]'><p>Profile is not updated for listing</p><CircularProgress/><p>Try refreshing the page</p></div>}
    </div>
  );
}

export default HomeProfile;
