import React, { useEffect, useState } from 'react'
import AdminHeader from './header'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Pagination, Table } from 'antd';
import { toast } from 'react-toastify';

function AdminCrud() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 15; // Manzoor shumara ka muqarrar karen
    const navigate = useNavigate()


    const handlelogOut = () => {
      localStorage.clear();
      window.location.reload();
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`/alladmins?page=${currentPage}&pageSize=${pageSize}`);
        const userData = response.data;
        // console.log(userData)
        setUsers(userData.data);
      } catch (error) {
        console.error('Data fetch karne mein masla:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); 
  
  
  
    const handleDelete = async (adminId) => {
      try {
        const token = localStorage.getItem('user-token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
  
        console.log(adminId)
        const iduser ={ "adminId" : adminId }
  
        const response = await axios.put(`/deleteadmin`, iduser,  config);
        
        console.log('User deleted successfully:', response.data);
        // console.log('User deleted successfully:', userId);
        toast(response?.data?.message)

        fetchData()
      } catch (error) {
        // alert("You do not have permission to access this resource")
        console.error('Error during delete:', error.message);
        toast(error?.response?.data?.message)
      }
    };
  
    const columns = [
      {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: 'Lastname',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
             {/* <Link to={`/updateUser/${record?.id}`} className='btn btn-sm btn-success'>Edit</Link> */}
        {/* <Button className='btn btn-sm btn-danger ms-1' onClick={() => console.log(record)}>Log Record</Button> */}
            <Link to={`/updateAdminfrom/${record?._id}`} className='btn btn-sm btn-success'>Edit</Link>
            <Button className='btn btn-sm btn-danger ms-1' onClick={() => handleDelete(record.id)}>Delete</Button>
          </span>
        ),
      },
    ];
  
    const onPageChange = (page) => {
      setCurrentPage(page);
    };
  
    const dataSource = Array.isArray(users)
      ? users.map((user) => ({
          id: user?._id,
          firstname: user.firstname,
          email: user?.email,
          phone: user.phonenumber,
          lastname: user.lastname,
        }))
      : [];
  return (
        <>
       <nav class="navbar navbar-expand-lg ">
  <div class="container">
    <a class="navbar-brand fs-1 text bold nav-logo" href="#">Heaven<spam className='navlogo-span'>.com</spam></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
      <ul class="navbar-nav  mb-2 mb-lg-0 gap-2 ">
        <li class="nav-item">
        <Button  onClick={() => navigate('/home')}>Home </Button>
        </li>
   
        
        
       
      </ul>
      
    </div>
  </div>
</nav>
      <div className='user-list section-padding'>
        <h1>Admin's List</h1>
        <div className='add-btn d-flex justify-content-start  align-items-center '>
          <Link to={'/createadminform'} className='add-btn btn btn-md mb-2  btn-success'>+ Add</Link>
        </div>
        <div className='user-box'>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
          <Pagination
            current={currentPage}
            total={users.length > 10} 
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      </div>
    </>
  )
}

export default AdminCrud
