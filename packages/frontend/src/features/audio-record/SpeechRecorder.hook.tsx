import { useEffect, useRef, useState } from "react";
import { createActor } from "xstate";
import { speechToTextMachine } from "./SpeechRecorder.machine";
import { useActor, useSelector } from "@xstate/react";

export function useSpeechToTextV2({ onEnd }: { onEnd: (finalValue: string) => void }) {
  const [speechActor, send] = useActor(speechToTextMachine, {
    input: {
      options: {
        onEnd,
      },
    },
  });

  const transcript = speechActor.context.currentTranscript;
  const isRecording = ["startingRecognition", "listening", "restarting", "stopping"].includes(speechActor.value);

  const start = () => send({ type: "START" });
  const stop = () => send({ type: "STOP" });
  const toggle = () => send({ type: "TOGGLE" });
  const setLanguage = (lang: string) => send({ type: "SET_LANGUAGE", language: lang });

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    transcript,
    isRecording,
    start,
    stop,
    toggle,
    setLanguage,
  };
}
