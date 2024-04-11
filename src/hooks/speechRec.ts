import { useEffect,useState } from "react";
const useSpeechRec = () => {};

let recognition: any = null;

if('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continious = true;
    recognition.lang = 'en-US';
}


const useSpeechRec = () => {
    const [text, setText] = useState('');
    const [isListening,SetisListening] = useState(false)

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event :', event);
            recognition.stop();
            SetisListening(false);
        }
    }, []);

    const startListening = () => {
        setText('')
        SetisListening(true);
        recognition.start();
    }

    const stopListening = () => {
        SetisListening(false);
        recognition.stop();
    }

    return {
        text, 
        isListening,
        startListening,
        hasRecognitionSupport: !! recognition,
    }

};

export default useSpeechRec;
