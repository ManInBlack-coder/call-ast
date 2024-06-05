
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { useCookies } from 'react-cookie'
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {

   
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    function fetchSessionUser() {
        fetch('http://localhost:8081/sessionUserId', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include credentials (cookies) in the request
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(idData => {
            console.log('User session data:', idData);
            

            // Now you have the user session data and can use it as needed
        })
        .catch(error => {
            console.error('Error fetching session user data:', error);
        });
    
    
    }

    fetchSessionUser()
    let tasks = ['pese noud ara ','kai poes', 'VIi prugi valja','korista tuba']
    let task = tasks[Math.floor(Math.random()*tasks.length)];
    
    
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userID,setUserID] = useState('')
    const [cookies, setCookie,removeCookie] = useCookies(['user','userID'])
    
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
            // console.log('nimi',response.data.email);
            // console.log('id', response.data.user_id)
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data); 
            } else {
                console.log(error); 
            }
        });
    }, []);


    console.log('kupsised Mainis',cookies.userID)

    
    
    
    function postData(idData:any, textData:any) {
        fetch('http://localhost:8081/to_db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials (cookies) in the request
            body: JSON.stringify({
                id: idData,
                text: textData
            }),
        })
        .then(response => {
            if (!response.ok) {
                console.log('Problem with response:', response);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data successfully sent:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    }


    
    console.log(fetchSessionUser())


    
    return (
            
        <div>
            <form action="" >   
                
         
                {hasRecognitionSupport ? (
                
                   <>
                    <div>
                        <button onClick={startListening}>Start rec</button>
                    
                    </div>

                    {/* <div>
                        <button onClick={stopListening}>Stop rec</button>
                    </div> */}
                    
                    {isListening ? <div>CURRENTLY LISTENING</div> : null}
                    {text}
                    {/* {postData(text)} */}

                  
                    </>
                ): ( 
                    <h1>Has no speech recognition support </h1>
                )}
                
            </form> 
            <div>
                       
                        <button onClick={() => postData(cookies.userID,task)}>Add task manually</button>
                    </div>

        </div>
    )

};

export default Main;

