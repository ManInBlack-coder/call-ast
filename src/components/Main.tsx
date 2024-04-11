import useSpeechRecognition from "../hooks/useSpeechRecognition";

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
                {isListening ? <div>CURRENTLY LISTENING</div> : null}
                </>
            ): (
                <h1>Has no speech recognition support </h1>
            )}
        </div>
    )

};

export default Main;

