import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react'
import { Button, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserSchema } from '../../../Schema';

function UpdateUserForm() {






    const userUpdate = async (values) => {
        try {
             await axios.put(`/updateuser`, values , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`
                  }
             }) ; 


             navigate('userlist')
        } catch (error) {
            alert("You do not have permission to access this resource")
          console.error('Error during update:', error.message);
        }
      };
      const { id: userId } = useParams();
    console.log(userId)

    const initialValues = {
        userId : userId,
        firstname : "",
        lastname : "",
        phonenumber : ""
    }
    
    const { values, errors, touched, handleChange, handleSubmit, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: updateUserSchema,
        onSubmit: (values) => {
            console.log(values)
            userUpdate(values)
            // console.log(cardId)
            }
        })
      


      const navigate = useNavigate()

  return (


    

         <div class="form-lgn">
            <Formik onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">


                        <div class="col-md-6">
                            <div class="form-main-lgn d-flex justify-content-center align-items-center">
                                <div class="form-container-lgn">
                                  
                                    <form>
                                    <h1>
                                        Update User
                                    </h1>

                                    </form>
                                    <div class="col-md-12">
                                        <div class="row">
                                        <div class="email margin">
                                                <div class="col-md-12 col-12">
                                                    <label for="exampleFormControlInput1" class="form-label">First Name*</label>
                                                    <input type="Email"
                                                        name='firstname'
                                                        value={values.firstname}
                                                        onChange={handleChange}
                                                        placeholder='firstname'
                                                        class="form-control"
                                                    />
                                                    {errors.firstname && touched.firstname ? (
                                                        <p className="p_msg">
                                                            {errors.firstname}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div class="email margin">
                                                <div class="col-md-12 col-12">
                                                    <label for="exampleFormControlInput1" class="form-label">Last Name*</label>
                                                    <input type="Email"
                                                        name='lastname'
                                                        value={values.lastname}
                                                        onChange={handleChange}
                                                        placeholder='lastname'
                                                        class="form-control"
                                                    />
                                                    {errors.lastname && touched.lastname ? (
                                                        <p className="p_msg">
                                                            {errors.lastname}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div class="phone margin">

                                                <div class="col-md-12 col-12">
                                                    <label class="form-label">Phone no*</label>
                                                    <input type="string"
                                                        onChange={handleChange}
                                                        onBlur={() => setFieldTouched('password', true, true)}
                                                        name='phonenumber'
                                                        placeholder='phonenumber'
                                                        value={values.phonenumber}
                                                        class="form-control"
                                                    />
                                                    {errors.phonenumber && touched.phonenumber ? (
                                                        <p className="p_msg">
                                                            {errors.phonenumber}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div class="btn-lgn">
                                                <Col md={12} sm={12}>
                                                    <Button onClick={handleSubmit}>Update user</Button>
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

export default UpdateUserForm
