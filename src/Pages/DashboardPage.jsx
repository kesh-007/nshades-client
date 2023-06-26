import React, { useState } from 'react'
import Example from '../Components/NavBar'
import {DataGrid} from '@mui/x-data-grid'
import { useEffect } from 'react'
import {CSVLink} from 'react-csv'
import AdUnit from '../Components/AdUnit'
import { moment } from 'moment'
import { FiDownload } from 'react-icons/fi';

function DashboardPage() {
    const email =localStorage.getItem('email')
    const [data,setData] = useState([])
    const [likes,setLikes] = useState([])
    const navigation=
    [
        { name: 'Enquires', href: '#', current: true },
        { name: 'Likes', href: '/dashboard/likes', current: false },

    ]
    function GetEnquires()
    {
        fetch('https://tihd2iw3fd.execute-api.us-west-2.amazonaws.com/get-enquiry',{
            method:"POST",
            headers:{"Content-type":'application/json'},
            body:JSON.stringify({email})
            
        }).then(response=>response.json())
        .then(data=>setData(data))
        
    }
    function GetLikes()
    {
        fetch('http://localhost:8000/get-likes',{
            method:"POST",
            headers:{"Content-type":'application/json'},
            body:JSON.stringify({email})
            
        }).then(response=>response.json())
        .then(data=>setLikes(data))
        
    }
    useEffect(()=>{
        GetEnquires()
        GetLikes()
    },[])
    const tableRows = data.map(row => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.phone_number}</td>
        <td>{row.message}</td>
        <td>{row.attime}</td>
      </tr>
    ));
  
    
      
    const columns =[
        {field:'name',headerName:"Name",width:250},
        {field:'email',headerName:"Email",width:250},
        {field:'number',headerName:"Number",width:150},
        {field:'message',headerName:"Message",width:340},
        {
            field: 'attime',
            headerName: 'Time',
            valueGetter: (params) => {
              const attime = params.row.attime;
              const date = new Date(attime);
              const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
              const formattedTime = date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });
              return `${formattedDate} ${formattedTime}`;
            },
            width: 200,
          },
          
          
        
    ]
    
    const moment = require('moment');

const csvData = data.map(row => ({
  Name: row.name,
  Email: row.email,
  Number: row.phone_number,
  Message: row.message,
  Time: moment(row.attime).format('DD-MM-YYYY HH:mm:ss')
}));


  return (
    <div>
        <Example thisnavigation={navigation}/>
        <h1 className="text-center text-3xl mb-[3rem] mt-[2rem]">Enquires Table</h1>
        <div className='flex justify-end mb-3 mr-3'>
          <button className='text-white p-2 bg-gray-900 rounded-md px-4 flex'>
          <CSVLink data={csvData} className='flex'><FiDownload className='mr-2 mt-1'/>Export</CSVLink>
          </button>
        </div>
        <div className='items-center justify-center ml-5 mr-5'>
        <DataGrid
        rows={data}
        columns={columns}
        
        />
        </div>


        <script async="async" data-cfasync="false" src="//pl19854220.highrevenuegate.com/f198cd473bf0abf18d5001f1b3f8e693/invoke.js"></script>
<div id="container-f198cd473bf0abf18d5001f1b3f8e693"></div>
        


    </div>
  )
}

export default DashboardPage