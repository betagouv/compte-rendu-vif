import { Center, Divider, Flex, Stack } from "#styled-system/jsx";
import { useTabsContext } from "@ark-ui/react/tabs";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import { format, parse } from "date-fns";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InputGroupWithTitle } from "../components/InputGroup";
import { SpaceTypeChips } from "../components/chips/SpaceTypeChips";
import { useUser } from "../contexts/AuthContext";
import type { Report } from "../generated/client";

export const InfoForm = () => {
  const form = useFormContext<Report>();
  const user = useUser()!;

  const meetDate = useWatch({ control: form.control, name: "meet_date" });

  const meetDateRef = useRef({
    day: meetDate ? format(new Date(meetDate), "yyyy-MM-dd") : "",
    time: meetDate ? format(new Date(meetDate), "HH:mm") : "",
  });

  const tryToSetMeetDate = () => {
    const day = meetDateRef.current.day;
    const time = meetDateRef.current.time;

    const date = parse(`${day}T${time}`, "yyyy-MM-dd'T'HH:mm", new Date());

    if (!day || !time || Number.isNaN(date.getTime())) {
      form.setValue("meet_date", undefined as any);
      return;
    }

    form.setValue("meet_date", date);
  };

  const setTime = (e: any) => {
    meetDateRef.current.time = e.target.value;
    tryToSetMeetDate();
  };

  const setDay = (e: any) => {
    meetDateRef.current.day = e.target.value;
    tryToSetMeetDate();
  };

  const tab = useTabsContext();

  return (
    <Flex direction="column" padding="16px">
      <Button type="button" onClick={() => console.log(form.formState)}>
        aaa
      </Button>
      <InputGroupWithTitle title="Le rendez-vous">
        <Input label="Titre" nativeInputProps={form.register("title")} />
        <Input label="Description" textArea nativeTextAreaProps={form.register("project_description")} />
        <Select label="Rédigé par" nativeSelectProps={form.register("redacted_by")}>
          <option value={user.name}>{user.name}</option>
        </Select>
        <Stack direction="row">
          <Input label="Date" nativeInputProps={{ type: "date", onChange: setDay }} />
          <Input label="Horaire" nativeInputProps={{ type: "time", onChange: setTime }} />
        </Stack>
      </InputGroupWithTitle>

      <Divider mb="32px" />

      <InputGroupWithTitle title="Le projet">
        <Input label="Nom du demandeur*" nativeInputProps={form.register("applicant_name")} />
        <Input label="Adresse du projet*" nativeInputProps={form.register("applicant_address")} />
        <Input label="Référence cadastrale du projet" nativeInputProps={form.register("project_cadastral_ref")} />
        <Input label="Service instructeur*" nativeInputProps={form.register("service_instructeur")} />
        <SpaceTypeChips />
      </InputGroupWithTitle>

      <Center>
        <Button
          type="button"
          // iconId="ri-draft-line"
          nativeButtonProps={{ type: "button", onClick: () => tab.setValue("notes") }}
        >
          Ajouter notes terrain
        </Button>
      </Center>
    </Flex>
  );
};
