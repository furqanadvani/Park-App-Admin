import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddParkForm.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { TimePicker } from 'antd';
import { Form, Formik, useFormik } from 'formik';
import axios from 'axios'
import dayjs from 'dayjs'
// import ImgCrop from 'antd-img-crop';
// import ImgCrop from 'antd-img-crop';
import { AddParkSchema } from '../../../Schema';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



function AddParkPage() {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewOpen(false);


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const navigate = useNavigate()
    const initialValues = {
        name: '',
        description: '',
        starttime: '',
        endtime: '',
        city: '',
        country: '',
        cost: 0,
        location: '',
        capacity: 0,
        images: [],
    };



    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: AddParkSchema,
        onSubmit: async (values) => {


            const formattedUTC = dayjs(`1970-01-01T${dayjs(values?.starttime).toISOString().split('T')[1]}`).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            setFieldValue('starttime', formattedUTC);
            const formattedEndUTC = dayjs(`1970-01-01T${dayjs(values.endtime).toISOString().split('T')[1]}`).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            console.log('endtime:', formattedEndUTC);
            console.log(values, "formik values")
            let body = new FormData();
            body.append('name', values.name);
            body.append('description', values.description);
            body.append('starttime', formattedUTC);
            body.append('endtime', formattedEndUTC);
            body.append('city', values.city);
            body.append('country', values.country);
            body.append('cost', values.cost);
            body.append('location', values.location);
            body.append('capacity', values.capacity);

            values?.images.forEach((file) => {
                console.log(`images :`, file);
                // if (file.originFileObj) {
                    // console.log(`File  has originFileObj property.`);
                    body.append(`images`, file?.originFileObj);
                // } else {
                    // console.log(`File does not have originFileObj property.`);
                // }
            });
            // values.images.forEach((image, index) => {
            //     body.append(`images[${index}]`, image.originFileObj);
            // });

            appPark(body);

        }
    });

    const handleChangeImg = ({ fileList }) => {
        // Map the fileList to ensure it contains the actual file objects
        const updatedFileList = fileList.map(file => {
            if (file.originFileObj) {
                return file;
            } else {
                // If the file does not have the originFileObj property, it might be a dummy file object with only UID.
                // Retrieve the actual file object from the state based on the UID.
                const existingFile = fileList.find(f => f.uid === file.uid);
                return existingFile || file;
            }
        });
        setFieldValue('images', updatedFileList);


        console.log(updatedFileList)
    };




    const [city, setcity] = useState()
    const [country, Setcountry] = useState('');


    async function appPark(formData) {
        try {

            const response = await axios.post('/addpark', formData);

            if (response.status === 200) {
                navigate('/Addpark')
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

            



            <div className='Add-park-from section-padding ' >
                <Formik >

                    <Container>
                        <Row>
                            <Col md={12} sm={12}>
                                <Form onSubmit={handleSubmit}>
{console.log('values',values)}
                                    <div className='form-park'>

                                        <div className='upload-img'>
                                            <h1>Upload images</h1>
                                            <Col md={12} sm={12}>
                                                {/* <input type='file' name='images' multiple  /> */}
                                                <Upload
                                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                    listType="picture-card"
                                                    fileList={values?.images}
                                                    onPreview={handlePreview}
                                                    onChange={handleChangeImg}
                                                >
                                                    {fileList.length >= 6 ? null : uploadButton}
                                                </Upload>
                                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                    <img
                                                        alt="example"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        src={previewImage}
                                                    />
                                                </Modal>
                                                {errors.images && touched.images ? (
                                                    <p className="p_msg">
                                                        {errors.images}
                                                    </p>
                                                ) : null}
                                            </Col>



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
                                                            allowClear={falsegit}
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
                                                    Add Park
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

export default AddParkPage; 