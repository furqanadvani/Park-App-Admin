import React from 'react'
import { Button, Col } from 'react-bootstrap'
import './form.css'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { LoginSchema } from '../../../Schema';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/userSlice';

function LoginForm() {


    const dispatch = useDispatch()

    const initialValues = {
        email: "",
        password: ""
    }

    const navigate = useNavigate()


    const { values, errors, touched, handleChange, handleSubmit, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            loginUser(values)
        }
    })






    async function loginUser(payload) {
        try {
            const response = await axios.post('/admin/login', payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            console.log(response);

            if (response.status === 200) {
                const responseData = response.data;
                const userToken = responseData.data.token;
                localStorage.setItem('user-token', userToken);
                // console.log(userToken)
                dispatch(login(responseData.data))
                navigate('/home');



            } else {

                console.error('Login failed:', response.statusText);
                // console.log(response.message)
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message);
            alert(error.response?.data?.message);
        }
    }




    return (
        <div class="form-lgn">
            <Formik onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">


                        <div class="col-md-6">
                            <div class="form-main-lgn d-flex justify-content-center align-items-center">
                                <div class="form-container-lgn">
                                    <div class="form-heading">
                                        <h1>Heaven<span>.com</span></h1>
                                    </div>
                                    <form>


                                    </form>
                                    <div class="col-md-12">
                                        <div class="row">

                                            <div class="email margin">
                                                <div class="col-md-12 col-12">
                                                    <label for="exampleFormControlInput1" class="form-label">EmailAddress*</label>
                                                    <input type="Email"
                                                        name='email'
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        placeholder='EmailAddress'
                                                        class="form-control"
                                                    />
                                                    {errors.email && touched.email ? (
                                                        <p className="p_msg">
                                                            {errors.email}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div class="phone margin">

                                                <div class="col-md-12 col-12">
                                                    <label class="form-label">Password*</label>
                                                    <input type="Password"
                                                        onChange={handleChange}
                                                        onBlur={() => setFieldTouched('Password', true, true)}
                                                        name='password'
                                                        placeholder='Password'
                                                        value={values.password}
                                                        class="form-control"
                                                    />
                                                    {errors.password && touched.password ? (
                                                        <p className="p_msg">
                                                            {errors.password}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div class="btn-lgn">
                                                <Col md={12} sm={12}>
                                                    <Button onClick={handleSubmit}>Login</Button>
                                                </Col>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </div>
    )
}

export default LoginForm
