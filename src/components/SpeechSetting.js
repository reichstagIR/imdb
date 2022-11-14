import React , {useEffect} from 'react';
import {BiMicrophone , BiMicrophoneOff} from "react-icons/bi";
//Lib
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
//Redux
import {useDispatch} from "react-redux";
import setSpeech from "../redux/speech/speechAction";

const SpeechSetting = () => {

    const {transcript , listening ,  browserSupportsSpeechRecognition} = useSpeechRecognition();

    useEffect(() => {
        dispatch(setSpeech(transcript));
    }, [transcript]);

    const dispatch = useDispatch();

    const clickHandler = () => {
        if(!browserSupportsSpeechRecognition){
            alert("did not support!");
        }
        else if(listening){
            SpeechRecognition.stopListening();
        }else{
            SpeechRecognition.startListening({language : "en-US"});
        }
    }

    return (
        <div className="rounded-full bg-[#D91921] text-white fixed bottom-24 w-14 h-14 right-3 flex items-center justify-center text-2xl">
            <button type="button" onClick={clickHandler}>
                {listening ? <BiMicrophone /> : <BiMicrophoneOff />}
            </button>
        </div>
    );
};

export default SpeechSetting;
