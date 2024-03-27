import { Formik, useFormik } from 'formik'
import React from 'react'
import { Button, Col, Container } from 'react-bootstrap'
import { updateAdminSchema, updateUserSchema } from '../../../Schema'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateAdmin() {

    const { id: adminId } = useParams();


    const navigate = useNavigate()


const initialValues = {
    adminId : adminId,
    firstname : "",
    lastname : "",
    password : "",
    // phonenumber : ""
}

const { values, errors, touched, handleChange, handleSubmit, setFieldTouched } = useFormik({
    initialValues: initialValues,
    validationSchema: updateAdminSchema,
    onSubmit: (values) => {
        console.log(values)
        handleUpdateAdmin(values)
        console.log(adminId)
        }
    })

    const handleUpdateAdmin = async () => {
        try {
          const token = localStorage.getItem('user-token');
          console.log(token , "user-token") 
          const config = {
          headers: {
              'Authorization': `Bearer ${token}`
            }
          };
             await axios.put(`/updateadmin`, values , config) ; 


             navigate('userlist')
        } catch (error) {
            alert("You do not have permission to access this resource")
          console.error('Error during update:', error.message);
        }
      };
      



  return (
    <div>
       <div className='Header-admin'>
    <Container>
        <div className='header-main-admin'>

        <div className='Admin-logo'>
            <h1 className='m-0 p-0'>Heaven<span>.com</span></h1>
        </div>
    
        </div>

    </Container>
    </div>
    <div class="form-lgn">
            <Formik onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">


                        <div class="col-md-6">
                            <div class="form-main-lgn d-flex justify-content-center align-items-center">
                                <div class="form-container-lgn">
                                  
                                    <form>


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
                                                    <label class="form-label">Password*</label>
                                                    <input type="password"
                                                        onChange={handleChange}
                                                        onBlur={() => setFieldTouched('password', true, true)}
                                                        name='password'
                                                        placeholder='password'
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
                                                    <Button onClick={handleSubmit}>Update Admin</Button>
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
    </div>
  )
}

export default UpdateAdmin
