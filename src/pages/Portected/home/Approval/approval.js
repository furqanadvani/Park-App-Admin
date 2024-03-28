import { Popconfirm, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function AllApproval() {


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
            title: 'Booking Date',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: 'Peoples',
            dataIndex: 'totalPeoples',
            key: 'totalPeoples',

        },
        {
            title: 'Total Cost',
            dataIndex: 'totalCost',
            key: 'totalCost',

        },
        {
            title: 'Advance Pay',
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
                    text: 'Approved',
                    value: 'approved',
                },
                {
                    text: 'Pending',
                    value: 'pending',
                },
            ],
            width: '10%',
        },


        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {record.status !== 'rejected' && record.status !== 'approved' && (
                        <Popconfirm
                            title="Accept the booking"
                            description="Are you sure to Accept this booking?"
                            onConfirm={() => confirmAccept(record , record?.bookingId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='btn btn-sm btn-success'>Accept</Button>
                        </Popconfirm>
                    )}
                    {record.status !== 'rejected' && record.status !== 'approved' && (
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => confirm(record, record?.bookingId)}
                            onCancel={cancel}

                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='btn btn-sm btn-danger ms-1'>Reject</Button>
                        </Popconfirm>
                    )}
                </span>
            ),
        },
    ];

    const confirm = (record) => {
        console.log(record);
        message.success('Click on Yes');
        RejectReq(record)


    };
    const confirmAccept = (record) => {
        console.log('acsdfs' ,  record?.bookingId);
        message.success('Booking Accepted');
        AcceptReq(record)


    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});



    async function AcceptReq(record) {

        const forId  = record?.bookingId ;
        const id ={ bookingId : forId};

        console.log(localStorage.getItem('user-token'))

        // const book = { BookingId: id  }
        // console.log(book);

        try {
            const respone = await axios.put('/approvebooking', id , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`
                }
            })
            getAllBooking();
            console.log(respone.data.error)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function RejectReq(record) {

        const forId  = record?.bookingId ;
        const id ={ bookingId : forId};

        try {
            const respone = await axios.put('/rejectbooking', id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`
                }
            })
            getAllBooking();
        } catch (error) {
            console.log(error)
        }
    }

    const getAllBooking = () => {
        setLoading(true);

        axios.get(`/approvals?status=${filters?.status || ""}`)
            .then((response) => {
                const { data } = response.data;
                setData(data);
                console.log(data);
                setLoading(false);

            })
            .catch((error) => {
                console.error('Error fetching booking data:', error);
                setLoading(false);
            });
    };
    const dataSource = Array.isArray(data)
        ? data.map((data) => ({
            bookingId: data?.booking?._id,
            parkname: data?.booking?.parkId?.name,
            name: <>{data.user.firstname}<br />{data.user.email}</>,
            starttime: data?.booking?.startTime?.slice(11, 16),
            endtime: data?.booking?.endTime?.slice(11, 16),
            date: data?.booking?.date.split('T')[0],
            totalCost: data?.booking?.totalCost,
            totalPeoples: data?.booking?.totalPeoples,
            advancePayment: data?.booking?.advancePayment,
            status: data.status,
        }))
        : [];

    useEffect(() => {
        getAllBooking();
    }, [filters]);
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination, filters, sorter', pagination, filters, sorter)
        setFilters({
            pageSize: pagination?.pageSize,
            status: filters?.status
        });
    }

    const navigate = useNavigate()

    return (
        <div>
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
               

                <div className='booking-body section-padding'>
                    <h3>All Approvals's</h3>
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
        </div>
    )
}

export default AllApproval
