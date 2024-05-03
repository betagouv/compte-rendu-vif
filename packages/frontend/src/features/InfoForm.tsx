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
import type { Report } from "@cr-vif/electric-client/frontend";
import { css } from "#styled-system/css";

export const InfoForm = () => {
  const form = useFormContext<Report>();
  const user = useUser()!;

  const meetDate = useWatch({ control: form.control, name: "meetDate" });

  const meetDateRef = useRef({
    day: meetDate ? format(new Date(meetDate), "yyyy-MM-dd") : "",
    time: meetDate ? format(new Date(meetDate), "HH:mm") : "",
  });

  const tryToSetMeetDate = () => {
    const day = meetDateRef.current.day;
    const time = meetDateRef.current.time;

    const date = parse(`${day}T${time}`, "yyyy-MM-dd'T'HH:mm", new Date());

    if (!day || !time || Number.isNaN(date.getTime())) {
      form.setValue("meetDate", undefined as any);
      return;
    }

    form.setValue("meetDate", date);
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
    <Flex direction="column" w="100%" padding="16px">
      <InputGroupWithTitle title="Le rendez-vous">
        <Stack gap={{ base: "0", sm: "16px" }} direction={{ base: "column", sm: "row" }}>
          <Select
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Rédigé par"
            nativeSelectProps={form.register("redactedBy")}
          >
            <option value={user.name}>{user.name}</option>
          </Select>
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Nom du demandeur*"
            nativeInputProps={form.register("applicantName")}
          />
        </Stack>

        <Stack direction="row" mt="16px">
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Date"
            nativeInputProps={{ type: "date", onChange: setDay }}
          />
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Horaire"
            nativeInputProps={{ type: "time", onChange: setTime }}
          />
        </Stack>
      </InputGroupWithTitle>

      <Divider mt="20px" mb="52px" />

      <InputGroupWithTitle title="Le projet">
        <Input label="Description" textArea nativeTextAreaProps={{ ...form.register("projectDescription"), rows: 5 }} />
        <Stack gap={{ base: "0", sm: "16px" }} direction={{ base: "column", sm: "row" }}>
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Adresse du projet*"
            nativeInputProps={form.register("applicantAddress")}
          />
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Service instructeur*"
            nativeInputProps={form.register("serviceInstructeur")}
          />
        </Stack>
        <Stack gap={{ base: "0", sm: "16px" }} direction={{ base: "column", sm: "row" }} mt="16px">
          <Input
            className={css({ flex: { base: "none", sm: 1 } })}
            label="Référence cadastrale du projet"
            nativeInputProps={form.register("projectCadastralRef")}
          />
          <SpaceTypeChips className={css({ flex: { base: "none", sm: 1 } })} />
        </Stack>
      </InputGroupWithTitle>

      <Center>
        <Button
          type="button"
          // iconId="ri-draft-line"
          nativeButtonProps={{ type: "button", onClick: () => tab.setValue("notes") }}
        >
          Rédiger le bilan
        </Button>
      </Center>
    </Flex>
  );
};
