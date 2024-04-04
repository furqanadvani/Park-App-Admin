import React, { useEffect } from 'react';
import './App.css';
import {  AuthRoutes, ProtectedRoutes } from './Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';

function App() {

  // const [userdata , setUserdata] =useState()
  const navigate = useNavigate()
  const user = useSelector(selectUser); 
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
 
  
    fetchData();
  
    return () => {

    };
  }, []);
  
  const fetchData = async () => {
    try {
    

      const response = await axios.get('/admin/getprofile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`
        }
      });
      console.log(response);
      if (response.status === 200) {
        const userDataApi = response.data;
        console.log(userDataApi);
        // setUserdata(userDataApi)
        navigate('/home')
        dispatch(login(userDataApi));
      } else {
        dispatch(logout());
        navigate('/login')
      }
    } catch (error) {
      console.error('User profile fetch mein error:', error);
      dispatch(logout());
    }
  };
 

  return (
    <>
   
          {user ? <ProtectedRoutes /> : <AuthRoutes />}
        </>
  );
}

export default App;
