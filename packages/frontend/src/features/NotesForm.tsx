import { ContactChips } from "#components/chips/ContactChips";
import { DecisionChips } from "#components/chips/DecisionChips";
import { FurtherInfoChips } from "#components/chips/FurtherInfoChips";
import { InputGroupWithTitle } from "#components/InputGroup";
import { css } from "#styled-system/css";
import { Center, Divider, Flex, Stack } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Report } from "../db/AppSchema";
import { SpeechRecorder } from "./audio-record/SpeechRecorder";
import { useIsFormDisabled } from "./DisabledContext";
import { UploadImage } from "./upload/UploadImage";

export const NotesForm = () => {
  const form = useFormContext<Report>();

  const isFormDisabled = useIsFormDisabled();

  return (
    <Flex direction="column" w="100%" padding="16px">
      <InputGroupWithTitle title="Décision & suite à donner">
        <DecisionChips disabled={isFormDisabled} />
        <PrecisionsTextArea />
      </InputGroupWithTitle>

      <UploadImage reportId={form.getValues().id} disabled={isFormDisabled} />

      <Divider mt="36px" mb="52px" />

      <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
        <ContactChips
          className={css({
            flex: { base: "none", lg: 1 },
          })}
          disabled={isFormDisabled}
        />
        <FurtherInfoChips
          className={css({
            flex: { base: "none", lg: 1 },
          })}
          disabled={isFormDisabled}
        />
      </Stack>

      <Center justifyContent={{ base: "center", lg: "flex-start" }} mt={{ base: "80px", lg: "50px" }} mb="120px">
        <Button iconId="ri-article-fill" type="submit" disabled={isFormDisabled}>
          Créer le CR
        </Button>
      </Center>
    </Flex>
  );
};

const PrecisionsTextArea = () => {
  const [isRecording, setIsRecording] = useState(false);
  const isFormDisabled = useIsFormDisabled();
  const form = useFormContext<Report>();

  const [interimText, setInterimText] = useState("");
  const valueRef = useRef("");

  const isRecordingProps = {
    value: valueRef.current + " " + interimText,
  };

  const isIdleProps = form.register("precisions");

  return (
    <Input
      className={css({ mt: "24px", "& > textarea": { mt: "0 !important" } })}
      disabled={isFormDisabled}
      label={
        <Flex justifyContent="space-between" w="100%">
          <span>Commentaire</span>
          <SpeechRecorder
            disabled={isFormDisabled}
            onStart={() => {
              setIsRecording(true);
              valueRef.current = form.watch("precisions") ?? "";
            }}
            onStop={() => setIsRecording(false)}
            onInterimText={(text) => {
              setInterimText(text);
            }}
            onFinalText={(text) => {
              form.setValue("precisions", valueRef.current + " " + text);
              valueRef.current = valueRef.current + " " + text;
              setInterimText("");
            }}
          />
        </Flex>
      }
      textArea
      nativeTextAreaProps={{
        ...(isRecording ? isRecordingProps : isIdleProps),
        id: "precisions",
        rows: 5,
      }}
    />
  );
};
