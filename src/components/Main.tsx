import useSpeechRecognition from "../hooks/useSpeechRecognition";
import React from "react";

const Main = () => {

    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    
    return (
            
        <div>
            {hasRecognitionSupport ? (
               
               <>
                <div>
                    <button onClick={startListening}>Start rec</button>
                </div>
                

                
                {isListening ? <div>
                    <div>
                    <button onClick={stopListening}>Stop rec</button>
                </div>
                    CURRENTLY LISTENING</div> : null}
                {text}
                </>
            ): ( 
                <h1>Has no speech recognition support </h1>
            )}
        </div>
    )

};

export default Main;

