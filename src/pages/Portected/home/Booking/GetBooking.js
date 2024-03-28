import {  Space, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import './GetBooking.css'
import qs from 'qs';
const columns = [
  {
    title: 'Park',
    dataIndex: 'parkname',
    key: 'Parkname',
  },
  {
    title: 'User Details',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Start',
    dataIndex: 'starttime',
    key: 'starttime',

  },
  {
    title: 'End',
    dataIndex: 'endtime',
    key: 'endtime',

  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',

  },
  {
    title: 'Peoples',
    dataIndex: 'totalPeoples',
    key: 'totalPeoples',

  },
  {
    title: 'Rates',
    dataIndex: 'totalCost',
    key: 'totalCost',

  },
  {
    title: 'Advance',
    dataIndex: 'advancePayment',
    key: 'advancePayment',

  },
  {
    title: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Rejected',
        value: 'rejected',
      },
      {
        text: 'Pending',
        value: 'pending',
      },
      {
        text: 'Completed',
        value: 'completed',
      },
      {
        text: 'Booked',
        value: 'booked',
      },
    ],
    width: '20%',
  },


  // {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text, record) => (
  //       <span>
  //          {/* <Link to={`/updateUser/${record?.id}`} className='btn btn-sm btn-success'>Edit</Link> */}
  //     {/* <Button className='btn btn-sm btn-danger ms-1' onClick={() => console.log(record)}>Log Record</Button> */}
  //         <Button className='btn btn-sm btn-success' onClick={() => AcceptReq(record.id)}>Accept</Button>
  //         <Button className='btn btn-sm btn-danger ms-1' onClick={() => RejectReq(record.id)}>Reject</Button>
  //       </span>
  //     ),
  //   },
];

// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

function GetAllBookings() {
  const [Booking, setBooking] = useState([]);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});







  const getAllBooking = () => {
    setLoading(true);

    axios.get(`/allbookings?status=${filters?.status || ''}`)
      .then((response) => {
        const { data } = response.data;
        setData(data);
        console.log(data); // Assuming 'data' contains the booking data
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
        setLoading(false);
      });
  };


  useEffect(() => {
    getAllBooking();
  }, [filters]);
  const handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination, filters, sorter', pagination, filters, sorter)
    setFilters({
      pageSize: pagination?.pageSize,
      status: filters?.status
    });

    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };



  const dataSource = Array.isArray(data)
    ? data.map((data) => ({
      id: data._id,
      parkname: data.parkId?.name,
      name: <>{data.userId.firstname}<br />{data.userId.email}</>,
      starttime: data?.startTime?.slice(11, 16),
      endtime: data?.endTime?.slice(11, 16),
      date: data.date.split('T')[0],
      totalCost: data.totalCost,
      totalPeoples: data.totalPeoples,
      advancePayment: data.advancePayment,
      status: data.status,
    }))
    : [];

  const navigate = useNavigate()

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
        <Button  onClick={() => navigate('/home')}>Home</Button>
        </li>
      </ul>
      
    </div>
  </div>
</nav>


      <div className='booking-body section-padding'>
        <h3>All Booking's</h3>
        {/* <Table columns={columns} dataSource={dataSource} /> */}
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={dataSource}
          pagination={{ pageSize: filters?.pageSize || 10 }}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  )
}

export default GetAllBookings
