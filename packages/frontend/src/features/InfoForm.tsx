import { Box, BoxProps, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import { useUser } from "../contexts/AuthContext";
import { InputGroup } from "../components/InputGroup";
import { PropsWithChildren, useRef } from "react";
import { ChipGroup } from "../components/Chip";
import { css } from "#styled-system/css";
import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "../generated/client";
import { format, parse } from "date-fns";

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

    const date = parse(day + "T" + time, "yyyy-MM-dd'T'HH:mm", new Date());

    if (!day || !time || isNaN(date.getTime())) {
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

  return (
    <Flex direction="column" padding="16px">
      <InputGroup asChild>
        <Flex direction="column">
          <Title>Le compte-rendu</Title>
          <Input label="Titre" nativeInputProps={form.register("title")} />
          <Select label="Rédigé par" nativeSelectProps={form.register("redacted_by")}>
            <option value={user.name}>{user.name}</option>
          </Select>
        </Flex>
      </InputGroup>

      <Divider mb="32px" />

      <InputGroup asChild>
        <Flex direction="column">
          <Title>Le rendez-vous</Title>
          <Stack direction="row">
            <Input label="Date" nativeInputProps={{ type: "date", onChange: setDay }} />
            <Input label="Horaire" nativeInputProps={{ type: "time", onChange: setTime }} />
          </Stack>
          <Input label="Lien visio ou adresse" nativeInputProps={form.register("meet_link")} />
        </Flex>
      </InputGroup>

      <Divider mb="32px" />

      <InputGroup asChild>
        <Flex direction="column">
          <Title>Le demandeur</Title>
          <ChipGroup
            onChange={(values) => {
              console.log(values?.[0]);
              form.setValue("applicant_type", values?.[0]);
            }}
            options={[
              { initialIsChecked: true, label: "particulier", key: "particulier" },
              { initialIsChecked: false, label: "maître d'œuvre", key: "maitre-d-oeuvre" },
              { initialIsChecked: false, label: "collectivité", key: "collectivite" },
            ]}
          />
          <Input className={css({ mt: "1rem" })} label="Nom" />
        </Flex>
      </InputGroup>

      <Divider mb="32px" />

      <InputGroup asChild>
        <Flex direction="column">
          <Title>Le projet</Title>
          <Input label="Ref cadastrale ou adresse" />
          <Select label="Relation territoire" nativeSelectProps={{}}>
            <option disabled>Sélectionner une option</option>
          </Select>
          <Input label="Nature du projet" />
        </Flex>
      </InputGroup>
    </Flex>
  );
};

const Title = ({ children, ...props }: PropsWithChildren & BoxProps) => (
  <styled.h6 mb="0.875rem" fontSize="20px" {...props}>
    {children}
  </styled.h6>
);
