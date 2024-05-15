import React, { useEffect } from 'react';
import {  Routes,Route,useNavigate } from 'react-router-dom';
// import Cont from './components/cont';
import RegistrationForm from './components/register';

import Login from './components/login';

import { CookiesProvider, useCookies } from 'react-cookie'



export const App: React.FC = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.user) {
      console.log('User cookie:', cookies.user);
      // If user cookie exists, redirect to home or the protected route
      navigate('/');
    } else {
      // If no user cookie, stay on the login page
      navigate('/login');
    }
  }, [cookies, navigate]);

  return (
      
  
        <Routes>

            {/* <Route path='/home' element={<Cont />}/> */}

         

          <Route path="/" element={<Login />} />




        </Routes>

   
      
      
)
     

}

export default App;
