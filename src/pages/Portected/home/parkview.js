import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
// import data from '../data.json';
// import './details.css'
import { Col, Container, Row } from 'react-bootstrap';
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

  return (
    <>
    <div>
      <div className='details-header'>
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
      </div>


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

  <button onClick={handleBooking}>
    book park
  </button>
  </div>

</div>

            <div className='intro-main-details'>
              
            <div className='intro-desc'>
              <h5>
                Description :
              </h5>
              <p>
                The First Collection at Jumeirah Village Circle is located in the district of JVC. The 41-story high-rise hotel features 491 fully equipped guestrooms. The hotel is within a 20-minute drive from
                Downtown Dubai and Dubai South, home to the Expo 2020 site.
                Guests staying at this hotel are eligible to access Soluna Restaurants and Beach Club at The Palm including transportation.
                The hotel includes an exclusive club lounge, a large swimming pool and sundeck, a fully equipped gymnasium, as well as separate male and female spa rooms.
                Specialty restaurants at the hotel include Santè Ria with its menu inspired by flavors of South America. The Village Bistro is a family-friendly venue with an à la Carte menu and buffet selection.
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
