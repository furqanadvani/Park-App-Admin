import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
// import data from '../data.json';
// import './details.css'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { selectAllparkhResult } from '../../../features/allParkSlice';
import './parkview.css'




function ParkView() {
  const { cardId } = useParams();
  const parkData = useSelector(selectAllparkhResult);

  // const [parkData, setParkData] = useState(null);
  const navigate = useNavigate();
  const park = parkData.find(item => item._id === cardId);


  const backTohome = () => navigate('/home');
  if (!park) {
    console.error('Park data not found for cardId:', cardId);
    return null; 
  }


 
  const handleBooking = () => navigate(`/bookingform/${cardId}`);
  const startTime = park?.parktiming?.starttime;
  const formattedTime = startTime ? startTime.slice(11, 16) : ''; // Extracting time part (hh:mm)
  console.log(formattedTime); 
  const EndTime = park?.parktiming?.endtime;
  const formattEnddTime = EndTime ? EndTime.slice(11, 16) : ''; // Extracting time part (hh:mm)
  console.log(formattedTime); 
  return (
    <>
    <div>
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
      {/* <div className='details-header'>
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className='details-header-main'>
                <div className='logo-details'>
                  <h1 onClick={backTohome}>
                    Heaven<span>
                      .com
                    </span>
                  </h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}


      <Container>

        <div className='items-details-main section-padding'>



          <Col md={12} sm={12}>
            <Row>

              <Col md={7} sm={12}>

                <div className='main-img'>
                  <img src={park.images[1]} alt='' />
                </div>
              </Col>
              <Col md={5} sm={12} className='m-0 p-0'>
                <Row>

                  <Col md={6} sm={12}  >
                    <div className='side-img-box'>
                      <img src={park.images[1]} alt='' />
                      <img src={park.images[2]} alt='' />
                    </div>
                  </Col>
                  <Col md={6} sm={12} className='m-0 p-0'>
                    <div className='side-img-box'>
                      <img src={park.images[3]} alt='' />
                      <img src={park.images[4]} alt='' />
                    </div>
                  </Col>
                </Row>

              </Col>

              {/* {cardData.images.slice(1, 4).map((imageUrl, index) => (
              <Col md={4} sm={12}>
                <div className='intro-images'>
                  
                  <img key={index} src={imageUrl} alt={`Image ${index + 1}`} draggable="false" />
                </div>
              </Col>

              
            ))} */}
            </Row>
          </Col>
          <Col md={12} sm={12}>
            <div className='items-title-city-main'>
              <div className='items-title-city'>
                <div className='item-title'>
                  <h1>
                    {park.name}
                  </h1>
                </div>
                <div className='city-icon'>
                  <i>
                    <IoLocationSharp />
                  </i>
                  <p className='m-0 p-0'>{park.city}, {park.country} </p>
                </div>
                
                <div className='city-icon'>
                  <i>
                    <IoLocationSharp />
                  </i>
                  <p className='m-0 p-0'>Park Timing : {formattedTime} To {formattEnddTime} </p>
                </div>
              </div>
              <div className='rating-items'>

                <div className='box-rating'>
                  <div className='rating'>
                    <h5>8.1</h5>
                  </div>
                  <div className='rating-title'>
                    <h4>Very Good</h4>
                  </div>
                </div>
              </div>

            </div>

          </Col>

          <Col md={12} sm={12} >
<div className='book-park'>

<div className='bok-title'>
<h4>
  Exprience The Park At ${park.cost}
</h4>
</div>

  <div className='bok-btn'>

  {/* <button onClick={handleBooking}>
    book park
  </button> */}
  </div>

</div>

            <div className='intro-main-details'>
              
            <div className='intro-desc'>
              <h5>
                Description :
              </h5>
              <p>
               {park.description}
              </p>
            </div>


            </div>

          </Col>
        </div>
      </Container>

    </div>
    </>
  );
}

export default ParkView;
