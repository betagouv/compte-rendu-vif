import { setup, assign, fromCallback, fromPromise } from "xstate";

interface SpeechRecognitionOptions {
  onEnd: (text: string) => void;
}

type PermissionState = "granted" | "denied" | "prompt";

type SpeechToTextContext = {
  interimTranscript: string;
  finalTranscript: string;
  currentTranscript: string;
  recognition: any | null;
  options: SpeechRecognitionOptions;
  error: string | null;
};

type SpeechToTextEvents =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "TOGGLE" }
  | { type: "SET_LANGUAGE"; language: string }
  | { type: "PERMISSION_GRANTED" }
  | { type: "PERMISSION_DENIED" }
  | { type: "PERMISSION_PROMPT" }
  | { type: "RECOGNITION_RESULT"; interim: string; final: string }
  | { type: "RECOGNITION_ERROR"; error: string }
  | { type: "RECOGNITION_END" }
  | { type: "RESTART" };

const checkPermissionsActor = fromPromise<PermissionState>(async () => {
  try {
    const result = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    return result.state;
  } catch (error) {
    console.error("Error checking microphone permissions:", error);
    return "prompt";
  }
});

const requestPermissionsActor = fromPromise<boolean>(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    console.error("Microphone permission denied:", error);
    return false;
  }
});

const recognitionActor = fromCallback<SpeechToTextEvents, { recognition: any; options: SpeechRecognitionOptions }>(
  ({ input, sendBack }) => {
    const { recognition, options } = input;

    if (!recognition) {
      sendBack({ type: "RECOGNITION_ERROR", error: "Recognition not initialized" });
      return;
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      sendBack({
        type: "RECOGNITION_RESULT",
        interim: interimTranscript,
        final: finalTranscript,
      });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        console.error("Microphone permission denied");
      }

      sendBack({ type: "RECOGNITION_ERROR", error: event.error });
    };

    recognition.onend = () => {
      sendBack({ type: "RECOGNITION_END" });
    };

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      sendBack({ type: "RECOGNITION_ERROR", error: String(error) });
    }

    return () => {
      try {
        recognition.stop();
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }
    };
  },
);

export const speechToTextMachine = setup({
  types: {
    context: {} as SpeechToTextContext,
    events: {} as SpeechToTextEvents,
    input: {} as {
      options: SpeechRecognitionOptions;
    },
  },
  actors: {
    checkPermissions: checkPermissionsActor,
    requestPermissions: requestPermissionsActor,
    recognition: recognitionActor,
  },
  actions: {
    initializeRecognition: assign({
      recognition: () => {
        if (typeof window === "undefined" || !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
          console.error("Speech Recognition is not supported in this browser");
          return null;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "fr-FR";

        return recognition;
      },
    }),

    resetTranscripts: assign(({ context }) => {
      const finalTranscript = (context.finalTranscript + (context.finalTranscript ? " " : "")).replaceAll("  ", " ");

      return { interimTranscript: "", finalTranscript };
    }),

    updateTranscripts: assign({
      interimTranscript: ({ event }) => {
        if (event.type === "RECOGNITION_RESULT") {
          return event.interim;
        }
        return "";
      },
      finalTranscript: ({ context, event }) => {
        if (event.type === "RECOGNITION_RESULT" && event.final) {
          return context.finalTranscript + event.final;
        }
        return context.finalTranscript;
      },
    }),

    updateInput: assign({
      currentTranscript: ({ context }) => {
        const currentValue = context.finalTranscript + context.interimTranscript;
        return currentValue;
      },
    }),

    finalizeInput: assign(({ context }) => {
      context.options.onEnd(context.currentTranscript);

      context.currentTranscript = "";
      context.interimTranscript = "";
      context.finalTranscript = "";

      return context;
    }),

    setLanguage: ({ context }, params: { language: string }) => {
      if (context.recognition) {
        context.recognition.lang = params.language;
      }
    },

    logError: assign({
      error: ({ event }) => {
        if (event.type === "RECOGNITION_ERROR") {
          return event.error;
        }
        return null;
      },
    }),
  },
  guards: {
    isSupported: ({ context }) => context.recognition !== null,
    isPermissionGranted: ({ event }: any) =>
      event.type === "PERMISSION_GRANTED" || (event.type === "requestPermissions.done" && event.output === true),
    isPermissionDenied: ({ event }: any) =>
      event.type === "PERMISSION_DENIED" || (event.type === "requestPermissions.done" && event.output === false),
  },
}).createMachine({
  id: "speechToText",
  context: ({ input }) => ({
    interimTranscript: "",
    finalTranscript: "",
    currentTranscript: "",
    recognition: null,
    options: input.options,
    error: null,
  }),
  initial: "initializing",
  states: {
    initializing: {
      entry: "initializeRecognition",
      always: [
        {
          guard: "isSupported",
          target: "idle",
        },
        {
          target: "unsupported",
        },
      ],
    },

    unsupported: {
      type: "final",
    },

    idle: {
      on: {
        START: "checkingPermissions",
        TOGGLE: "checkingPermissions",
        SET_LANGUAGE: {
          actions: {
            type: "setLanguage",
            params: ({ event }) => ({ language: event.language }),
          },
        },
      },
    },

    checkingPermissions: {
      invoke: {
        id: "checkPermissions",
        src: "checkPermissions",
        onDone: [
          {
            guard: ({ event }) => event.output === "granted",
            target: "startingRecognition",
          },
          {
            guard: ({ event }) => event.output === "denied",
            target: "permissionDenied",
          },
          {
            guard: ({ event }) => event.output === "prompt",
            target: "requestingPermissions",
          },
        ],
        onError: "idle",
      },
    },

    requestingPermissions: {
      invoke: {
        id: "requestPermissions",
        src: "requestPermissions",
        onDone: [
          {
            guard: "isPermissionGranted",
            target: "startingRecognition",
          },
          {
            guard: "isPermissionDenied",
            target: "permissionDenied",
          },
        ],
      },
    },

    permissionDenied: {
      entry: [
        {
          type: "logError",
          params: { error: "Microphone permissions denied" },
        },
      ],
      after: {
        100: "idle",
      },
    },

    startingRecognition: {
      entry: ["resetTranscripts"],
      always: "listening",
    },

    listening: {
      invoke: {
        id: "recognitionActor",
        src: "recognition",
        input: ({ context }) => ({
          recognition: context.recognition,
          options: context.options,
        }),
        onError: {
          target: "idle",
          actions: "logError",
        },
      },
      on: {
        RECOGNITION_RESULT: {
          actions: ["updateTranscripts", "updateInput"],
        },
        RECOGNITION_ERROR: {
          target: "idle",
          actions: ["updateTranscripts", "finalizeInput", "logError"],
        },
        RECOGNITION_END: {
          target: "restarting",
        },
        STOP: {
          target: "stopping",
        },
        TOGGLE: {
          target: "stopping",
        },
        restart: {
          target: "restarting",
        },
      },
    },

    restarting: {
      entry: ["resetTranscripts"],
      always: "listening",
    },

    stopping: {
      entry: ["finalizeInput"],
      after: {
        100: "idle",
      },
    },
  },
});
