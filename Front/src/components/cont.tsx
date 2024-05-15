import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Todo from "./Todo"
import Main from "./Main"
import { CookiesProvider, useCookies } from 'react-cookie'



const Cont = () => {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [cookies, setCookie] = useCookies(['user'])
    
    console.log(cookies)

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(response => {
            console.log(response.data)
            if (response.data.valid) {
                setEmail(response.data.email);
                setCookie('user', response.data.email, { path: '/' })
              
                
            } else {
                navigate('/login');
            }
            console.log(response);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data); 
            } else {
                console.log(error); 
            }
        });
    }, []);
    

    return(
        <div>
            <h1>Welcome {cookies.user} </h1>
            
            <Main/>
        
            <Todo/>
          
        </div>
    )
    
};

export default Cont