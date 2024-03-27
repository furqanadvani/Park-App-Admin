import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllparkhResult, setAllParkResult } from '../../../features/allParkSlice';
import { Container, Row, Col } from 'react-bootstrap';
import './Allpark.css'
import { useNavigate } from 'react-router-dom';


function AllparkList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const parkData = useSelector(selectAllparkhResult);

    const [item, setitem] = useState();

    const handleViewMore = (cardId , item) => {
        navigate(`/detail/${cardId}` , { state: { cardData: item } });
        console.log(cardId)
      };

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    useEffect(() => {

        AllParks();

        return()=>{

        }
       
    }, []);




    async function AllParks() {

        try {

            const Respones = await axios.get('/allparks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`
                }
            })
            const responseData = Respones.data;
            setitem(responseData.data)
            console.log(responseData.data)
            dispatch(setAllParkResult(responseData.data))
        }
        catch (error) {
            console.log(error)
        }
    }


    async function DeletePark (cardId) {
        try{
            const deleteApi = await axios.put('/deletepark', { parkId: cardId } )
            console.log(deleteApi?.data)
            AllParks();

        }catch(error){
            console.log(error);
        }
    }   


    return (
        <div>
<div className='Header-admin add-park-header-main'>
                <Container>

                    <div className='hotels-header header-main-admin'>
                        <div className='hotel-header-logo Admin-logo'>
                            <h1>Heaven<span>.com</span></h1>
                        </div>
                        <div className='hotels-btn admin-add '>
                            <button onClick={() => navigate('/AddparkForm')}>App Park</button>
                        </div>
                    </div>
                </Container>
            </div>

            <div className='box-container section-padding'>
                <Container>
                    <Row>

                        {parkData && parkData.map((item) => {
                            return (
                                <Col sm={12} md={4}>
                                    <div className='park-box' key={item._id}>
                                        <Col md={12} sm={12}>

                                            <div className='box-img'>
                                                <img src={item?.images[0]} alt='' />
                                            </div>
                                        </Col>

                                        <Col md={12}>

                                            <div className='box-content'>
                                                <div className='park-park'>
                                                    <p>Park</p>
                                                </div>

                                                <div className='title-city'>
                                                    <div className='box-title'>
                                                        <h3 className='m-0 p-0'>{item.name}</h3>

                                                    </div>

                                                    <div className='city'>
                                                        <h5 className='m-0 p-0'> {item.city} , {item.country} </h5>
                                                    </div>
                                                </div>

                                                <div className='box-rating'>
                                                    <div className='rating'>
                                                        <h5>8.1</h5>
                                                    </div>
                                                    <div className='rating-title'>
                                                        <h4>Very Good</h4>
                                                    </div>
                                                </div>

                                                <div className='box-desc'>
                                                    <p className='m-0 p-0'>
                                                        {truncate(item?.description, 110)}
                                                    </p>
                                                </div>

                                                <div className='box-stock'>
                                                    <h5 className='m-0 p-0'>
                                                        capacity : {item?.capacity}
                                                    </h5>
                                                </div>
                                            </div>



                                        </Col>
                                        <Col md={12} sm={12}>
                                            <div className='more-details'>
                                                <button onClick={() => handleViewMore(item._id, item)}>Reserve</button>
                                                <button onClick={() => navigate(`/updatePark/${item._id}` , { state: { cardData: item } })}>Edit</button>
                                                <button onClick={() => DeletePark(item._id)}>Delete</button>
                                            </div>
                                        </Col>
                                    </div>


                                </Col>
                            )
                        })}

                    </Row>
                </Container>

            </div>
        </div>
    )
}

export default AllparkList
