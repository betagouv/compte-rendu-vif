import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StateReport } from "../../db/AppSchema";
import { ImmeubleAutocomplete } from "../ImmeubleAutocomplete";
import { Flex } from "#components/ui/Flex.tsx";
import { StateReportFormType } from "./utils";
import { WithReferencePop } from "./WithReferencePop";
import { Box } from "@mui/material";
import { useBannerBgColor } from "#components/Banner.tsx";

export const StateReportForm = ({ report }: { report: StateReport }) => {
  const form = useForm<StateReportFormType>({
    defaultValues: { ...emptyStateReport, ...report },
  });
  const bgColor = useBannerBgColor();

  const onSubmit = (data: StateReportFormType) => {
    console.log(data);
  };
  return (
    <Flex flexDirection="column" alignItems={"center"} width="100%">
      <FormProvider {...form}>
        <Flex
          justifyContent="center"
          bgcolor={bgColor}
          component="form"
          pt="32px"
          pb="32px"
          width="100%"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Box width={{ xs: "100%", lg: "1040px" }} px="16px">
            <ImmeubleAutocomplete />
          </Box>
        </Flex>
        <Box width={{ xs: "100%", lg: "1040px" }} px="16px" pb="32px">
          <WithReferencePop />
        </Box>
      </FormProvider>
    </Flex>
  );
};

const emptyStateReport: StateReport = {
  id: "",
  nature_edifice: null,
  reference_pop: null,
  adresse: null,
  commune: null,
  code_postal: null,
  commune_historique: null,
  reference_cadastrale: null,
  periode_construction: null,
  nature_protection: null,
  parties_protegees: null,
  description: null,
  observations: null,
  udap_id: null,
  created_by: null,
  created_at: null,
  disabled: null,
};
