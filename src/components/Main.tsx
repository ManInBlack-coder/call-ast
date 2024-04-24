import useSpeechRecognition from "../hooks/useSpeechRecognition";
import React, { useEffect } from "react";
import axios from 'axios';

const Main = () => {

    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

 
    function postData(textData) {
    
        fetch('/http://localhost:8081/to_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textData }),
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data successfully sent:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}


    
    return (
            
        <div>
            <form action="" >   
                {hasRecognitionSupport ? (
                
                   <>
                    <div>
                        <button onClick={startListening}>Start rec</button>
                    </div>

                    <div>
                        <button onClick={stopListening}>Stop rec</button>
                    </div>

                    {isListening ? <div>CURRENTLY LISTENING</div> : null}
                    {text}
                    {postData(text)}
                    </>
                ): ( 
                    <h1>Has no speech recognition support </h1>
                )}
            </form> 

        </div>
    )

};

export default Main;

