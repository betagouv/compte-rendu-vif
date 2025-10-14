import { PropsWithChildren, useState } from "react";
import { useAuthContext, useRefreshUser, useUser } from "../contexts/AuthContext";
import { Autocomplete, Box, Dialog, DialogTitle, Modal } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, unauthenticatedApi } from "../api";
import { useStyles } from "tss-react";
import { Button } from "#components/MUIDsfr.tsx";
import { Flex } from "#components/ui/Flex.tsx";

export const UdapSelection = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const shouldSelectUdap = user?.udap_id === "no-udap";

  return (
    <>
      {shouldSelectUdap ? <UdapSelectionModal /> : null}
      {children}
    </>
  );
};

const UdapSelectionModal = () => {
  const { setAuth } = useAuthContext();
  const { cx } = useStyles();

  const [value, setValue] = useState<string | null>(null);

  const udapsQuery = useQuery({ queryKey: ["udaps"], queryFn: async () => unauthenticatedApi.get("/api/udaps") });
  const udaps = udapsQuery.data ?? [];

  const selectUdapMutation = useMutation({
    mutationFn: async (udap_id: string) => {
      const targetUdap = udaps.find((u) => u.id === udap_id);
      if (!targetUdap) throw new Error("Udap not found");

      await api.post("/api/change-udap", { body: { udap_id } });
      setAuth((old) => ({ ...old, user: { ...old.user!, udap: targetUdap, udap_id } }));
    },
  });

  return (
    <Dialog open={true}>
      <Box p={4} width={400}>
        <DialogTitle>Selectionnez votre UDAP</DialogTitle>
        <Autocomplete
          disablePortal
          options={udaps}
          getOptionLabel={(item) => item.name || ""}
          value={value ? udaps.find((item) => item.id == value) : null}
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
          <Button onClick={() => value && selectUdapMutation.mutate(value)} disabled={!value}>
            Valider
          </Button>
        </Flex>
      </Box>
    </Dialog>
  );
};
