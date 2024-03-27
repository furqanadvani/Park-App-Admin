import React, { useEffect, useState } from 'react'
import AdminHeader from './header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Pagination, Table } from 'antd';

function AdminCrud() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 15; // Manzoor shumara ka muqarrar karen
  
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
      } catch (error) {
        alert("You do not have permission to access this resource")
        console.error('Error during delete:', error.message);
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
      <AdminHeader />
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
