import Button from "@codegouvfr/react-dsfr/Button";
import { useState, useRef, useEffect } from "react";

export const SpeechRecorder = ({
  onInterimText,
  onFinalText,
  onStart,
  onStop,
}: {
  onInterimText: (text: string) => void;
  onFinalText: (text: string) => void;
  onStart: () => void;
  onStop: () => void;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "fr-FR";

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      if (finalTranscript) {
        onFinalText(finalTranscript);
      }
      if (interimTranscript) {
        onInterimText(interimTranscript);
      }
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
      onStop();
    };

    recognitionRef.current.onerror = (event: any) => {
      setError(`Error: ${event.error}`);
      stopRecording();
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  if (error) console.error(error);

  const toggleRecording = async () => {
    try {
      if (!isRecording) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognitionRef.current.start();
        setIsRecording(true);
        setError("");
        onStart();
      } else {
        stopRecording();
      }
    } catch (err: any) {
      console.log(err);
      setError(`Microphone error: ${err.message}`);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    onStop();
  };

  return (
    <Button
      type="button"
      priority={isRecording ? "primary" : "tertiary"}
      iconId="ri-mic-fill"
      onClick={toggleRecording}
    >
      {isRecording ? <>En cours</> : <>Dicter</>}
    </Button>
  );
};
