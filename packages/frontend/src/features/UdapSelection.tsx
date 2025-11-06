import { PropsWithChildren, useState } from "react";
import { useAuthContext, useLiveUser, useRefreshUser, useUser } from "../contexts/AuthContext";
import { Autocomplete, Box, Dialog, DialogTitle, Modal } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, unauthenticatedApi } from "../api";
import { useStyles } from "tss-react";
import { Button } from "#components/MUIDsfr.tsx";
import { Flex } from "#components/ui/Flex.tsx";

export const ServiceSelection = ({ children }: PropsWithChildren) => {
  const user = useLiveUser();
  const shouldSelectService = user?.service_id === "no-service";

  return (
    <>
      {shouldSelectService ? <ServiceSelectionModal /> : null}
      {children}
    </>
  );
};

const ServiceSelectionModal = () => {
  const { cx } = useStyles();

  const [value, setValue] = useState<string | null>(null);

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => unauthenticatedApi.get("/api/services"),
  });
  const services = servicesQuery.data ?? [];

  const selectServiceMutation = useMutation({
    mutationFn: async (service_id: string) => {
      const targetService = services.find((u) => u.id === service_id);
      if (!targetService) throw new Error("Service not found");

      await api.post("/api/change-service", { body: { service_id } });
    },
  });

  return (
    <Dialog open={true} disablePortal>
      <Box p={4} width={400}>
        <DialogTitle>Selectionnez votre service</DialogTitle>
        <Autocomplete
          disablePortal
          options={services}
          getOptionLabel={(item) => (item.name as string) || ""}
          value={value ? services.find((item) => item.id == value) : null}
          onChange={(_e, item) => {
            setValue(item?.id || null);
          }}
          renderInput={(params) => (
            <div className="fr-input-group">
              <Box ref={params.InputProps.ref} mt="8px">
                <input
                  {...params.inputProps}
                  className={cx(params.inputProps.className, "fr-input")}
                  placeholder={"Sélectionner un service instructeur"}
                  type={"text"}
                />
              </Box>
            </div>
          )}
          noOptionsText="Aucun résultat"
        />

        <Flex justifyContent="flex-end" mt="16px">
          <Button onClick={() => value && selectServiceMutation.mutate(value)} disabled={!value}>
            Valider
          </Button>
        </Flex>
      </Box>
    </Dialog>
  );
};
