import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Todo from "./Todo"
import Main from "./Main"



const Cont = () => {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(response => {
            if (response.data.valid) {
                setEmail(response.data.email);
                
            } else {
                navigate('/home');
            }
            console.log(response);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data); // Log the error response data for better debugging
            } else {
                console.log(error); // Log the error if it's not a server response error
            }
        });
    }, []);
    

    return(
        <div>
            <h1>Welcome  </h1>
            
            <Main/>
        
            <Todo/>
          
        </div>
    )

};

export default Cont