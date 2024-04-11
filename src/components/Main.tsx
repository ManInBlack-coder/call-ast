import useSpeechRec from "../hooks/speechRec";

const Main = () => {

    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRec();

    
    return <div>main</div>;

};

export default Main;

