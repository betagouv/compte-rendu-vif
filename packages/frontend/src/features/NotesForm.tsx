import { Divider, Flex, Stack } from "#styled-system/jsx";
import { useFormContext } from "react-hook-form";
import { InputGroupWithTitle } from "#components/InputGroup";
import Input from "@codegouvfr/react-dsfr/Input";
import type { Report } from "@cr-vif/electric-client/frontend";
import { DecisionChips } from "#components/chips/DecisionChips";
import { ContactChips } from "#components/chips/ContactChips";
import { css } from "#styled-system/css";
import { FurtherInfoChips } from "#components/chips/FurtherInfoChips";
import Button from "@codegouvfr/react-dsfr/Button";

export const NotesForm = () => {
  const form = useFormContext<Report>();

  return (
    <Flex direction="column" w="100%" padding="16px">
      <InputGroupWithTitle title="Décision & suite à donner">
        <DecisionChips />
        <Input
          className={css({ mt: "8px" })}
          label="Commentaire"
          textArea
          nativeTextAreaProps={{ ...form.register("precisions"), rows: 5 }}
        />
      </InputGroupWithTitle>

      <Divider mt="36px" mb="52px" />

      <Stack gap={{ base: "0", sm: "16px" }} direction={{ base: "column", sm: "row" }}>
        <ContactChips
          className={css({
            flex: { base: "none", sm: 1 },
          })}
        />
        <FurtherInfoChips
          className={css({
            flex: { base: "none", sm: 1 },
          })}
        />
      </Stack>

      <Flex>
        <Button type="submit">Enregistrer</Button>
      </Flex>
    </Flex>
  );
};
