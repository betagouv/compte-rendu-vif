import { Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { useFormContext } from "react-hook-form";
import { InputGroupWithTitle } from "#components/InputGroup";
import Input from "@codegouvfr/react-dsfr/Input";
import { DecisionChips } from "#components/chips/DecisionChips";
import { ContactChips } from "#components/chips/ContactChips";
import { css } from "#styled-system/css";
import { FurtherInfoChips } from "#components/chips/FurtherInfoChips";
import Button from "@codegouvfr/react-dsfr/Button";
import { useIsFormDisabled } from "./DisabledContext";
import { Report } from "../db/AppSchema";

export const NotesForm = () => {
  const form = useFormContext<Report>();

  const isFormDisabled = useIsFormDisabled();

  return (
    <Flex direction="column" w="100%" padding="16px">
      <InputGroupWithTitle title="Décision & suite à donner">
        <DecisionChips disabled={isFormDisabled} />
        <Input
          className={css({ mt: "24px" })}
          disabled={isFormDisabled}
          label="Commentaire"
          textArea
          nativeTextAreaProps={{ ...form.register("precisions"), rows: 5 }}
        />
      </InputGroupWithTitle>

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
