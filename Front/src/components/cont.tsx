import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Todo from "./Todo"
import Main from "./Main"
import { useCookies } from 'react-cookie'



const Cont = () => {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userID,setUserID] = useState('')
    const [cookies, setCookie,removeCookie] = useCookies(['user','userID'])
    
    console.log('kupsised',cookies.userID)

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(response => {
            console.log(response.data)
            if (response.data.valid) {
                setUserID(response.data.userId);
                setEmail(response.data.email);
                setCookie('user', response.data.email, { path: '/' });
                setCookie('userID', response.data.user_id, { path: '/' });
                
            } else {
                navigate('/login');
            }
            console.log('nimi',response.data.email);
            console.log('id', response.data.user_id)
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data); 
            } else {
                console.log(error); 
            }
        });
    }, []);

    

    const handleLogout = () => {
        removeCookie('user');
        removeCookie('userID')
        navigate('/');
        window.location.reload();
      };

     
    // console.log('cookie user',cookies.user)

    return(
        <div>
           
           <div>

            <button onClick={handleLogout}>lOGOUT</button>
           </div>
            <h1>Welcome {cookies.user} </h1>
            
            <Main/>
        
            <Todo/>
          
        </div>
    )
    
};

export default Cont;