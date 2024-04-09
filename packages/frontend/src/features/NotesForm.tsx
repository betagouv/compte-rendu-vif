import { Flex } from "#styled-system/jsx";
import { useFormContext } from "react-hook-form";
import { InputGroupWithTitle } from "../components/InputGroup";
import Input from "@codegouvfr/react-dsfr/Input";
import type { Report } from "../generated/client/prismaClient";
import { ChipGroup } from "../components/Chip";

export const NotesForm = () => {
  const form = useFormContext<Report>();

  return (
    <Flex direction="column" padding="16px">
      <InputGroupWithTitle title="Le projet">
        <Input label="Description" textArea nativeTextAreaProps={form.register("project_description")} />
      </InputGroupWithTitle>

      <InputGroupWithTitle title="Décision & suite à donner">
        <label className="fr-label" htmlFor="decision">
          Décision
        </label>
        <ChipGroup
          id="decision"
          options={[
            { key: "yes", label: "Oui" },
            { key: "no", label: "Refus" },
            { key: "dedale", label: "Dédale" },
          ]}
          onChange={(values) => {
            form.setValue("decision", values?.[0]);
          }}
          isMulti={false}
          mt="5px"
          mb="16px"
        />
        <Input label="Commentaires" textArea nativeTextAreaProps={form.register("decision_comment")} />
      </InputGroupWithTitle>
    </Flex>
  );
};
