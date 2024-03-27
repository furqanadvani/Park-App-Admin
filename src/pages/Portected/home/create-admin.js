import React from 'react'
import { Button, Col, } from 'react-bootstrap'
import './create-admin.css'
import { useNavigate } from 'react-router-dom'
import { Form, Formik, useFormik } from 'formik'
import { CreateAdminSchema } from '../../../Schema'
import axios from 'axios'







function CreateAdminForm() {

    const navigate = useNavigate();


    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        Confirm_Password: '',
    };


    const { values, errors, touched, handleChange, handleSubmit, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: CreateAdminSchema,
        onSubmit: (values) => {
            CreateAdmin(values)
            console.log(values)
            console.log(errors, "formik errors")
        }


    });



    async function CreateAdmin(values) {

        try {

            const respones = await axios.post('/createadmin', values, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            const apiRes = respones.data;
            console.warn(apiRes, "apiRes")
            const token = apiRes.data.token;
            localStorage.setItem("user-token", token)
            alert("Admin Created Successfully")
            navigate('/adminlist')
        } catch (error) {
            // alert("You do not have permission to access this resource")
            console.error('Error during signup:', error);
        }
    }

    return (


        <div class="form create-admin">

            <Formik>


                <div class="container">

                    <Form onSubmit={handleSubmit} validateOnChange={true}>

                        <div class="row d-flex justify-content-center align-items-center">
                            <div class="col-md-6">
                                <div class="form-main d-flex justify-content-center align-items-center">
                                    <div class="form-container">
                                        <div class="form-heading">
                                            <h1>Heaven<span>.com</span></h1>
                                        </div>
                                        <form>


                                        </form>
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="fst-lst margin">
                                                    <div class="col-md-12">
                                                        <div class="row">

                                                            <div class="col-md-6 col-12">
                                                                <label for="exampleFormControlInput1" class="form-label">First Name*</label>
                                                                <input type="name"
                                                                    name='firstname'
                                                                    value={values.firstname}
                                                                    onChange={handleChange}
                                                                    onBlur={() => setFieldTouched('firstname', true, true)}
                                                                    class="form-control"
                                                                />

                                                                {errors.firstname && touched.firstname ? (
                                                                    <p className="p_msg">
                                                                        {errors.firstname}
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                            <div class="fst-lst col-md-6 col-12">
                                                                <label for="exampleFormControlInput1" class="form-label">Last Name*</label>
                                                                <input type="name"
                                                                    name='lastname'
                                                                    value={values.lastname}
                                                                    onChange={handleChange}
                                                                    onBlur={() => setFieldTouched('lastname', true, true)}
                                                                    class="form-control"
                                                                />
                                                                {errors.lastname && touched.lastname ? (
                                                                    <p className="p_msg">
                                                                        {errors.lastname}
                                                                    </p>
                                                                ) : null}
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="email margin">
                                                    <div class="col-md-12 col-12">
                                                        <label for="exampleFormControlInput1" class="form-label">EmailAddress*</label>
                                                        <input type="name"
                                                            name='email'
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={() => setFieldTouched('email', true, true)}
                                                            class="form-control"
                                                        />
                                                        {errors.email && touched.email ? (
                                                            <p className="p_msg">
                                                                {errors.email}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                              
                                                <div class="password margin">
                                                    <div class="col-md-12">
                                                        <div class="row">

                                                            <div class=" col-md-6 col-12">
                                                                <label for="exampleFormControlInput1" class="form-label">Password*</label>
                                                                <input
                                                                    type="password"
                                                                    name='password'
                                                                    value={values.password}
                                                                    onBlur={() => setFieldTouched('password', true, true)}
                                                                    onChange={handleChange}
                                                                    class="form-control"

                                                                />
                                                                {errors.password && touched.password ? (
                                                                    <p className='p_msg'>{errors.password}</p>
                                                                ) : null}
                                                            </div>


                                                            <div class=" col-md-6 col-12">
                                                                <label for="exampleFormControlInput1" class="form-label">Confirm Password*</label>
                                                                <input
                                                                    type="password"
                                                                    name='Confirm_Password'
                                                                    value={values.Confirm_Password}
                                                                    onBlur={() => setFieldTouched('Confirm_Password', true, true)}
                                                                    onChange={handleChange}
                                                                    class="form-control"
                                                                />
                                                                {errors.Confirm_Password && touched.Confirm_Password ? (
                                                                    <p className='p_msg'>{errors.Confirm_Password}</p>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="btn-sign">

                                                    <Col md={12} sm={12}>
                                                        <Button onClick={handleSubmit}>Create Admin</Button>
                                                    </Col>
                                                </div>
                                               

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Formik>

        </div>




    )
}

export default CreateAdminForm
