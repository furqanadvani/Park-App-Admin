import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './AddParkForm.css'
import {  Col, Container, Row } from 'react-bootstrap'
import { TimePicker } from 'antd';
import { Form, Formik, useFormik } from 'formik';
import axios from 'axios'
import dayjs from 'dayjs'
import { AddParkSchema, UpdateParkSchema } from '../../../Schema';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllparkhResult } from '../../../features/allParkSlice';





function UpdateParkForm() {

    const { cardId } = useParams();
   
    const navigate = useNavigate()
    const initialValues = {
        parkId : cardId,
        name: '',
        description: '',
        starttime: '',
        endtime: '',
        city: '',
        country: '',
        cost: 0,
        location: '',
        capacity: 0,
    };

  

    const { values, errors, touched, handleChange, append, handleSubmit, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: UpdateParkSchema,
        onSubmit: async (values) => {


            const formattedUTC = dayjs(`1970-01-01T${dayjs(values?.starttime).toISOString().split('T')[1]}`).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            setFieldValue('starttime', formattedUTC);
            const formattedEndUTC = dayjs(`1970-01-01T${dayjs(values.endtime).toISOString().split('T')[1]}`).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            console.log('endtime:', formattedEndUTC);
            console.log(values, "formik values")
            // values.images.forEach((image, index) => {
            //     formData.append(`images[${index}]`, image.originFileObj);
            // });
    
            Updatepark(values);

        }
    });






    const [city, setcity] = useState()
    const [country, Setcountry] = useState('');



    async function Updatepark(values) {
        try {

            const response = await axios.put('/editpark', values, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('user-token')}`,
                },
            });


            if (response.status === 200) {
            } else {
                console.error('Request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during request:', error.message);
        }
    }






    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const countries = [
        { id: 1, name: 'USA', cities: ['New York', 'Los Angeles', 'Chicago'] },
        { id: 2, name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
        { id: 2, name: 'Pakistan', cities: ['karachi', 'Islamabad', 'lahore', 'Faisalbad', 'Murree', 'Sawat'] },
        { id: 2, name: 'UAE', cities: ['Abu Dhahi', 'Sharja', 'Al Ain'] },
        { id: 2, name: 'Malaysia', cities: ['Kuala Lumpur', 'Ipoh', 'George Town, Penang'] },
    ];

    const handleCountryChange = (e) => {
        const selectedCountryValue = e.target.value;
        setSelectedCountry(selectedCountryValue);
        Setcountry(selectedCountryValue)
        setSelectedCity('');
    };

    const handleCityChange = (e) => {
        const selectedCityValue = e.target.value;
        setSelectedCity(selectedCityValue);
        setcity(selectedCity)
    };




    



    return (
        <>


            <div className='Header-admin add-park-header-main'>
                <Container>

                    <div className='hotels-header header-main-admin'>
                        <div className='hotel-header-logo Admin-logo'>
                            <h1>Heaven<span>.com</span></h1>
                        </div>
                        <div className='hotels-btn admin-add '>
                            <button onClick={() => navigate('userlist')}>User List</button>
                            <button>Add Park</button>
                        </div>
                    </div>
                </Container>
            </div>



            <div className='Add-park-from section-padding ' >
                <Formik>

                    <Container>
                        <Row>
                            <Col md={12} sm={12}>
                                <Form onSubmit={handleSubmit}>

                                    <div className='form-park'>

                                        <div className='upload-img'>
                                            <h1>Update park</h1>
                                          



                                        </div>

                                        <Col md={6} sm={12}>
                                            <div className="park-name">
                                                <label for="exampleInputPassword1">Park Name *</label>
                                                <input type="name"
                                                    name='name'
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={() => setFieldTouched('name', true, true)}
                                                    className="form-control"
                                                    placeholder="Tile" />
                                                {errors.name && touched.name ? (
                                                    <p className="p_msg">
                                                        {errors.name}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col md={12} sm={12} >
                                            <div className="form-group">
                                                <label for="exampleFormControlTextarea1">Description *</label>
                                                <textarea
                                                    name='description'
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onBlur={() => setFieldTouched('description', true, true)}
                                                    className="form-control"
                                                    rows="4"></textarea>
                                                {errors.description && touched.description ? (
                                                    <p className="p_msg">
                                                        {errors.description}
                                                    </p>
                                                ) : null}

                                            </div>
                                        </Col>

                                        <Col md={12} sm={12}>
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <div className="form-group">
                                                        <label for="exampleInputPassword1">Start Time *</label>
                                                        <TimePicker
                                                            className="form-control"
                                                            name="starttime"
                                                            allowClear={false}
                                                            value={values.starttime ? dayjs(values.starttime) : null}
                                                            onChange={(val) => {
                                                                const formattedUTC = dayjs(`1970-01-01T${dayjs(val).toISOString().split('T')[1]}`).toISOString();
                                                                setFieldValue('starttime', formattedUTC);
                                                            }}
                                                            onBlur={() => setFieldTouched('starttime', true)}
                                                            placeholder="Start Time"
                                                        />
                                                        {errors.starttime && touched.starttime ? (
                                                            <p className="p_msg">
                                                                {errors.starttime}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md={6} sm={12}>
                                                    <div className="form-group">
                                                        <label for="exampleInputPassword1">End Time *</label>
                                                        <TimePicker
                                                            className="form-control"
                                                            name="endtime"
                                                            allowClear={false}
                                                            value={values.endtime ? dayjs(values.endtime) : null}
                                                            onChange={(val) => {
                                                                const formattedUTC = dayjs(`1970-01-01T${dayjs(val).toISOString().split('T')[1]}`).toISOString();
                                                                setFieldValue('endtime', formattedUTC);
                                                            }}
                                                            onBlur={() => setFieldTouched('endtime', true)}
                                                            placeholder="End Time"
                                                        />
                                                        {errors.starttime && touched.starttime ? (
                                                            <p className="p_msg">
                                                                {errors.starttime}
                                                            </p>
                                                        ) : null}
                                                        {/* <input type="time"
                                                                className="form-control"
                                                                name='endtime'
                                                                value={values.endtime}
                                                                onChange={handleChange}
                                                                onBlur={() => setFieldTouched('endtime', true, true)}
                                                                placeholder="Password" />
                                                            {errors.endtime && touched.endtime ? (
                                                                <p className="p_msg">
                                                                    {errors.endtime}
                                                                </p>
                                                            ) : null} */}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <div className='country-city'>
                                            <Col md={12} sm={12}>
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <div className="form-group">
                                                            <Col md={12} sm={12}>
                                                                <label htmlFor="countrySelect">Country *</label>
                                                            </Col>
                                                            <Col md={12} sm={12}>
                                                                <select
                                                                    name='country'
                                                                    id="countrySelect"
                                                                    value={values.country}  // Use values.country directly
                                                                    onChange={(e) => {
                                                                        setFieldValue('country', e.target.value);  // Update the country value in the form
                                                                        handleCountryChange(e);  // Call handleCountryChange if needed
                                                                    }}
                                                                    onBlur={() => setFieldTouched('country', true, true)}
                                                                >
                                                                    <option value="">Select Country</option>
                                                                    {countries.map((country) => (
                                                                        <option key={country.id} value={country.name}>
                                                                            {country.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </Col>
                                                        </div>
                                                    </Col>
                                                    <Col md={6} sm={12}>
                                                        <div className="form-group">
                                                            <Col md={12} sm={12}>
                                                                <label htmlFor="citySelect">City *</label>
                                                            </Col>
                                                            <Col md={12} sm={12}>
                                                                <select
                                                                    id="citySelect"
                                                                    name='city'
                                                                    value={values.city}  // Use values.city directly
                                                                    onChange={(e) => {
                                                                        setFieldValue('city', e.target.value);  // Update the city value in the form
                                                                        handleCityChange(e);  // Call handleCityChange if needed
                                                                    }}
                                                                    disabled={!selectedCountry}
                                                                    onBlur={() => setFieldTouched('city', true, true)}
                                                                >
                                                                    <option value="">Select City</option>
                                                                    {selectedCountry &&
                                                                        countries
                                                                            .find((country) => country.name === selectedCountry)
                                                                            ?.cities.map((city) => (
                                                                                <option key={city} value={city}>
                                                                                    {city}
                                                                                </option>
                                                                            ))}
                                                                </select>
                                                                {errors.city && touched.city ? (
                                                                    <p className="p_msg">
                                                                        {errors.city}
                                                                    </p>
                                                                ) : null}
                                                            </Col>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </div>


                                        <Col md={12} sm={12} >
                                            <div className="form-group">
                                                <label for="exampleFormControlTextarea1">Address *</label>
                                                <input type="address"
                                                    name='location'
                                                    value={values.location}
                                                    onBlur={() => setFieldTouched('location', true, true)}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="location" />
                                                {errors.location && touched.location ? (
                                                    <p className="p_msg">
                                                        {errors.location}
                                                    </p>
                                                ) : null}

                                            </div>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <Row>
                                                <Col md={6} sm={12} >
                                                    <div className="form-group">
                                                        <label for="exampleFormControlTextarea1">Capacity *</label>
                                                        <input type="number"
                                                            className="form-control"
                                                            name='capacity'
                                                            value={values.capacity}
                                                            onBlur={() => setFieldTouched('capacity', true, true)}
                                                            onChange={handleChange}
                                                            placeholder="capacity" />
                                                        {errors.capacity && touched.capacity ? (
                                                            <p className="p_msg">
                                                                {errors.capacity}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col md={6} sm={12} >
                                                    <div className="form-group">
                                                        <label for="exampleFormControlTextarea1">Cost *</label>
                                                        <input type="number"
                                                            name='cost'
                                                            value={values.cost}
                                                            onBlur={() => setFieldTouched('cost', true, true)}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                            placeholder="Cost" />
                                                        {errors.cost && touched.cost ? (
                                                            <p className="p_msg">
                                                                {errors.cost}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={12} sm={12} lg={12}>
                                            <div className='submit-btn'>

                                                <button type="submit" onClick={handleSubmit} >
                                                    Update Park
                                                </button>
                                            </div>
                                        </Col>

                                    </div>
                                </Form>


                            </Col>
                        </Row>
                    </Container>
                </Formik>

            </div>
        </>
    )
}

export default UpdateParkForm; 