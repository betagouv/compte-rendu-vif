import { Box, Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { useTabsContext } from "@ark-ui/react/tabs";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import { format, parse } from "date-fns";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InputGroupWithTitle } from "#components/InputGroup";
import { SpaceTypeChips } from "#components/chips/SpaceTypeChips";
import { useUser } from "../contexts/AuthContext";
import type { Report } from "@cr-vif/electric-client/frontend";
import { css } from "#styled-system/css";
import { ServiceInstructeurSelect } from "./ServiceInstructeurSelect";
import { useIsFormDisabled } from "./DisabledContext";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";

export const InfoForm = () => {
  const form = useFormContext<Report>();
  const user = useUser()!;

  const isFormDisabled = useIsFormDisabled();

  const meetDate = useWatch({ control: form.control, name: "meetDate" });
  const meetDateRef = useRef({
    day: meetDate ? format(new Date(meetDate), "yyyy-MM-dd") : "",
    time: meetDate ? format(new Date(meetDate), "HH:mm") : "",
  });

  const redactedById = useWatch({ control: form.control, name: "redactedById" });

  const tryToSetMeetDate = () => {
    const day = meetDateRef.current.day;
    const time = meetDateRef.current.time;

    const date = parse(`${day}T${time}`, "yyyy-MM-dd'T'HH:mm", new Date());
    if (!day || !time || Number.isNaN(date.getTime())) {
      form.setValue("meetDate", undefined as any);
      return;
    }

    form.setValue("meetDate", date.toISOString() as any);
  };

  const setTime = (e: any) => {
    meetDateRef.current.time = e.target.value;
    tryToSetMeetDate();
  };

  const setDay = (e: any) => {
    meetDateRef.current.day = e.target.value;
    tryToSetMeetDate();
  };

  const redactedByQuery = useLiveQuery(
    db.delegation.liveMany({ where: { delegatedTo: user.id }, include: { user_delegation_createdByTouser: true } }),
  );

  const redactedByOptions: { value: string; label: string }[] = [
    {
      value: user.id,
      label: user.name,
    },
    ...(redactedByQuery.results?.map((delegation) => ({
      value: (delegation as any).user_delegation_createdByTouser?.id,
      label: (delegation as any).user_delegation_createdByTouser?.name,
    })) ?? []),
  ];

  const tab = useTabsContext();

  const baseRedactedByProps = form.register("redactedById");
  const redactedByProps = {
    ...baseRedactedByProps,
    onChange: (e: any) => {
      const option = redactedByOptions.find((option) => option.value === e.target.value);

      baseRedactedByProps.onChange(e);
      form.setValue("redactedBy", option?.label ?? null);
    },
  };

  return (
    <Flex direction="column" w="100%" padding="16px">
      <InputGroupWithTitle title="Le rendez-vous">
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Select
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: "16px" } })}
            label="Rédigé par"
            disabled={isFormDisabled}
            nativeSelectProps={redactedByProps}
          >
            {redactedByOptions?.map((option) => (
              <option key={option.value} value={option.value} selected={
                redactedById === option.value
              }>
                {option.label}
              </option>
            )) ?? null}
          </Select>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: "16px" } })}
            disabled={isFormDisabled}
            label="Nom du demandeur"
            nativeInputProps={form.register("applicantName")}
          />
        </Stack>

        <styled.div mt="8px">
          <Input
            className={css({})}
            disabled={isFormDisabled}
            label="Courriel demandeur"
            nativeInputProps={form.register("applicantEmail")}
          />
        </styled.div>

        <Stack direction="row" mt="24px">
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Date"
            nativeInputProps={{ type: "date", onChange: setDay, value: meetDateRef.current.day }}
          />
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Horaire"
            nativeInputProps={{ type: "time", onChange: setTime, value: meetDateRef.current.time }}
          />
        </Stack>
      </InputGroupWithTitle>

      <Divider mt="20px" mb="52px" />

      <InputGroupWithTitle title="Le projet">
        <Input
          className={css({ mb: { base: "24px", lg: undefined } })}
          label="Description"
          disabled={isFormDisabled}
          textArea
          nativeTextAreaProps={{ ...form.register("projectDescription"), rows: 5 }}
        />

        <Input
          className={css({ flex: { base: "none", lg: 2 }, mt: "16px", mb: { base: "24px", lg: undefined } })}
          disabled={isFormDisabled}
          label="Adresse"
          nativeInputProps={form.register("applicantAddress")}
        />
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Code postal"
            // hintText="Ce champ apparaitra dans la liste des compte-rendus"
            nativeInputProps={form.register("zipCode")}
          />
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Commune"
            // hintText="Ce champ apparaitra dans la liste des compte-rendus"
            nativeInputProps={form.register("city")}
          />
        </Stack>
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: "24px" })}
            disabled={isFormDisabled}
            label="Référence cadastrale"
            nativeInputProps={form.register("projectCadastralRef")}
          />
          <Box
            className={css({
              flex: {
                base: "none",
                lg: 1,
              },
            })}
          >
            <ServiceInstructeurSelect disabled={isFormDisabled} />
          </Box>
        </Stack>
        <SpaceTypeChips className={css({ flex: { base: "none", lg: 1 } })} disabled={isFormDisabled} />
      </InputGroupWithTitle>

      <Center justifyContent={{ base: "center", lg: "flex-start" }} mt={{ base: "80px", lg: "50px" }} mb="120px">
        <Button
          type="button"
          iconId="ri-arrow-right-line"
          nativeButtonProps={{
            type: "button",
            onClick: () => {
              tab.setValue("notes");
            },
          }}
        >
          Rédiger le bilan
        </Button>
      </Center>
    </Flex>
  );
};
