import { useEffect,useState } from "react";


let recognition: any = null;

if('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continious = true;
    recognition.lang = 'en-US';
}


const useSpeechRecognition = () => {
    const [text, setText] = useState('');
    const [isListening,SetisListening] = useState(false)

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event :', event);
            setText(event.results[0][0].transcript)
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

export default useSpeechRecognition;

