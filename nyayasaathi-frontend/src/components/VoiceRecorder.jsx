import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaStopCircle } from 'react-icons/fa';

const VoiceRecorder = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support the Web Speech API. Please try Chrome.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'hi-IN'; // Set to Hindi

    recognitionInstance.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      onTranscription(finalTranscript);
    };

    setRecognition(recognitionInstance);
  }, [onTranscription]);

  const toggleListen = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        onClick={toggleListen}
        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-secondary'
        } text-white`}
      >
        {isListening ? (
          <FaStopCircle size={40} />
        ) : (
          <FaMicrophone size={40} />
        )}
      </button>
      <p className="mt-4 text-lg text-gray-700">
        {isListening ? 'सुन रहा है... समाप्त करने के लिए टैप करें' : 'बोलने के लिए टैप करें'}
      </p>
    </div>
  );
};

export default VoiceRecorder;