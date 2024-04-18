import { Flex } from "#styled-system/jsx";
import { useFormContext } from "react-hook-form";
import { InputGroupWithTitle } from "../components/InputGroup";
import Input from "@codegouvfr/react-dsfr/Input";
import type { Report } from "../generated/client/prismaClient";
import { DecisionChips } from "../components/chips/DecisionChips";
import { ContactChips } from "../components/chips/ContactChips";
import { css } from "#styled-system/css";
import { FurtherInfoChips } from "../components/chips/FurtherInfoChips";
import Button from "@codegouvfr/react-dsfr/Button";

export const NotesForm = () => {
  const form = useFormContext<Report>();

  return (
    <Flex direction="column" padding="16px">
      <InputGroupWithTitle title="Décision & suite à donner">
        <DecisionChips />
        <Input
          className={css({ mt: "8px" })}
          label="Précisions"
          textArea
          nativeTextAreaProps={form.register("precisions")}
        />
      </InputGroupWithTitle>

      <InputGroupWithTitle title="Informations utiles">
        <ContactChips />
        <FurtherInfoChips />
      </InputGroupWithTitle>

      <Flex>
        <Button type="submit">Enregistrer</Button>
      </Flex>
    </Flex>
  );
};
