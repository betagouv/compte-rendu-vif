import { EnsureUser } from "#components/EnsureUser.tsx";
import { createFileRoute } from "@tanstack/react-router";
import Summary from "@codegouvfr/react-dsfr/Summary";
import Download from "@codegouvfr/react-dsfr/Download";
import { useUserSettings } from "../hooks/useUserSettings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db, useDbQuery } from "../db/db";
import {
  AuthContext,
  useAuthContext,
  useLiveUser,
  useRefreshUdap,
  useRefreshUser,
  useUdap,
  useUser,
} from "../contexts/AuthContext";
import { v4 } from "uuid";
import { Spinner } from "#components/Spinner";
import { EmailInput } from "../components/EmailInput";
import { Delegation, User } from "../db/AppSchema";
import { Chip } from "#components/Chip";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { api } from "../api";
import JSZip from "jszip";
import { downloadFile } from "../utils";
import { datePresets, DateRangePicker, SuccessAlert } from "./udap";
import { PropsWithChildren, ReactNode, useContext, useState } from "react";
import { format, subDays } from "date-fns";
import { getPDFInMailName } from "@cr-vif/pdf";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, Stack, Typography } from "@mui/material";
import { Divider } from "#components/ui/Divider.tsx";
import { Accordion, Button, Center, Input, Select } from "#components/MUIDsfr.tsx";
import { useStyles } from "tss-react";

const AccountPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
    document.getElementById("root")?.scrollTo(0, 0);
  };

  return (
    <Flex
      gap={{ xs: "0", lg: "80px" }}
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="center"
      alignItems={{ lg: "flex-start", xs: "center" }}
      width="100%"
      mb="40px"
    >
      <Stack width={{ xs: "100%", lg: "auto" }}>
        <BreadcrumbNav label="Mon compte" />
        <Typography variant="h1" display={{ lg: "none" }} mt="16px" mb="32px" px={{ xs: "16px" }}>
          Mon compte
        </Typography>
        <AccordionIfMobile>
          <Summary
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: "transparent",
            }}
            links={[
              { linkProps: { href: "#default-recipient" }, text: "Destinataire par défaut" },
              { linkProps: { href: "#share" }, text: "Droit d'édition partagé" },
              { linkProps: { href: "#download" }, text: "Télécharger mes CR" },
              { linkProps: { href: "#change-udap" }, text: "Changer d'UDAP" },
            ]}
          />
        </AccordionIfMobile>
      </Stack>
      <Divider display={{ lg: "none" }} width="90%" ml="5%" color="background-action-low-blue-france-hover" />
      <Center
        flex="1"
        flexDirection="column"
        alignItems="flex-start"
        maxWidth="900px"
        mt="32px"
        px={{ xs: "16px", lg: "0" }}
        textAlign="left"
      >
        <Typography variant="h1" display={{ xs: "none", lg: "block" }} mt="16px" mb="32px">
          Mon compte
        </Typography>
        {isSuccess ? <SuccessAlert /> : null}
        <DefaultRecipient />
        <Divider my={{ xs: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <Share />
        <Divider my={{ xs: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <DownloadCRs />
        <Divider my={{ xs: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <ChangeUDAP onSuccess={onSuccess} />
      </Center>
    </Flex>
  );
};

export const AccordionIfMobile = ({ children }: { children: NonNullable<ReactNode> }) => {
  return (
    <>
      <Accordion
        sx={{
          display: { lg: "none" },
          mx: "16px",
          "& .fr-summary__title": { display: "none" },
          "& .fr-summary": { pt: "0" },
        }}
        label="Sommaire"
      >
        {children}
      </Accordion>

      <Box
        sx={{
          "& .fr-summary": { p: 0, m: 0 },
        }}
        display={{ xs: "none", lg: "block" }}
        mb="32px"
        px={{ xs: "16px", lg: "0" }}
      >
        {children}
      </Box>
    </>
  );
};

const DefaultRecipient = () => {
  const user = useUser()!;
  const { userSettings, isLoading: isUserSettingsLoading, existing } = useUserSettings();

  const selectedEmails =
    userSettings.default_emails
      ?.split(",")
      .map((email: string) => email.trim())
      .filter(Boolean) ?? [];

  const saveEmailsMutation = useMutation(async (emails: string[]) => {
    const doesUserSettingExist =
      existing ||
      !!(await db.selectFrom("user_settings").where("user_id", "=", user.id).selectAll().executeTakeFirst());

    if (doesUserSettingExist) {
      return db
        .updateTable("user_settings")
        .set({ default_emails: emails.join(",") })
        .where("user_id", "=", user.id)
        .execute();
    }

    return db
      .insertInto("user_settings")
      .values({ id: v4(), user_id: user.id, default_emails: emails.join(",") })
      .execute();
  });

  return (
    <Flex gap="0px" flexDirection="column" width="100%">
      <Title anchor="default-recipient">1. Destinataire par défaut</Title>
      <Box>
        {isUserSettingsLoading ? (
          <Spinner size={100} />
        ) : (
          <EmailInput
            label="Courriel en copie par défaut :"
            hintText="Pour tous mes CRs envoyés"
            value={selectedEmails}
            onValueChange={(e) => saveEmailsMutation.mutate(e)}
          />
        )}
      </Box>
    </Flex>
  );
};

const Share = () => {
  const user = useUser()!;

  const coworkersQuery = useDbQuery(
    db.selectFrom("user").where("udap_id", "=", user.udap_id).where("id", "!=", user.id).selectAll(),
  );

  const delegationsQuery = useDbQuery(db.selectFrom("delegation").where("createdBy", "=", user.id).selectAll());

  const delegatedToMeQuery = useDbQuery(
    db
      .selectFrom("delegation")
      .where("delegatedTo", "=", user.id)
      .innerJoin("user", "delegation.createdBy", "user.id")
      .selectAll(["delegation"])
      .select(["user.name as createdByName"]),
  );

  const coworkers = coworkersQuery.data ?? [];
  const delegations = delegationsQuery.data ?? [];
  const delegatedToMe = delegatedToMeQuery.data ?? [];

  return (
    <Flex gap="0px" flexDirection="column" width="100%">
      <Title anchor="share">2. Droit d'édition partagé</Title>
      {coworkers.length ? (
        <Box>
          <Box mb="16px">Ces personnes peuvent créer, modifier et supprimer vos CR : </Box>
          <ManageDelegations coworkers={coworkers} delegations={delegations} />
          {delegatedToMe.length ? (
            // @ts-ignore alert needs a title ?
            <Alert
              style={{
                marginTop: "16px",
              }}
              small={false}
              closable={false}
              severity="info"
              description={
                delegatedToMe.map((user) => user.createdByName).join(", ") +
                ` vous autorise${delegatedToMe.length > 1 ? "nt" : ""} à créer, modifier et supprimer ${delegatedToMe.length > 1 ? "leurs" : "ses"} CRs.`
              }
            />
          ) : null}
        </Box>
      ) : (
        // @ts-ignore alert needs a title ?
        <Alert
          small={false}
          severity="info"
          description={
            "Aucun autre utilisateur de votre UDAP n'est enregistré sur Compte rendu VIF. Vous ne pouvez donc pas autoriser d'autres personnes à créer, modifier et supprimer vos CR."
          }
        />
      )}
    </Flex>
  );
};

export const BreadcrumbNav = ({ label }: { label: string }) => {
  return (
    <>
      <Box component="nav" width="100%" mt="32px" mb={{ xs: "0", lg: "32px" }} px={{ xs: "16px", lg: "8px" }}>
        <ol className="fr-breadcrumb__list">
          <li>
            <a href="/" className="fr-breadcrumb__link">
              Accueil
            </a>
          </li>
          <li>
            <a className="fr-breadcrumb__link" aria-current="page">
              {label}
            </a>
          </li>
        </ol>
      </Box>

      {/* <Accordion className={css({ hideFrom: "lg", mx: "16px" })} label="Sommaire">
        <styled.nav mb="0 !important" pl="calc(2rem + 8px)">
          <ol className="fr-breadcrumb__list">
            <li>
              <a href="/" className="fr-breadcrumb__link">
                Accueil
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                {label}
              </a>
            </li>
          </ol>
        </styled.nav>
      </Accordion> */}
    </>
  );
};

const ManageDelegations = ({ coworkers, delegations }: { coworkers: User[]; delegations: Delegation[] }) => {
  const user = useUser()!;

  const createMutation = useMutation((delegation: Omit<Delegation, "id">) =>
    db
      .insertInto("delegation")
      .values({ ...delegation, id: v4() })
      .execute(),
  );
  const removeMutation = useMutation((delegation: Delegation) =>
    db.deleteFrom("delegation").where("id", "=", delegation.id).execute(),
  );

  return (
    <Flex gap="8px" flexWrap="wrap">
      {coworkers.map((coworker) => {
        const delegation = delegations.find((del) => del.delegatedTo === coworker.id);
        return (
          <Chip
            style={{
              whiteSpace: "nowrap",
            }}
            key={coworker.id}
            onCheckChange={(e) =>
              e
                ? createMutation.mutate({ createdBy: user.id, delegatedTo: coworker.id })
                : removeMutation.mutate(delegation!)
            }
            isChecked={!!delegation}
          >
            {coworker.name!}
          </Chip>
        );
      })}
    </Flex>
  );
};

const DownloadCRs = () => {
  const [startDate, setStartDate] = useState(datePresets[0].startDate);
  const [endDate, setEndDate] = useState(datePresets[0].endDate);

  const user = useUser()!;

  const downloadMutation = useMutation(async (reports: { id: string; name: string }[]) => {
    if (!reports?.length) {
      return;
    }
    const zip = new JSZip();

    for (const report of reports) {
      const pdf = await api.get("/api/pdf/report", { query: { reportId: report.id } });
      zip.file(`${report.name}.pdf`, pdf as string, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    downloadFile(url, getZipFilename(startDate, endDate));
    URL.revokeObjectURL(url);
  });

  const crs = useDbQuery(
    db
      .selectFrom("report")
      .where("createdBy", "=", user.id)
      .where("udap_id", "=", user.udap_id)
      .where("pdf", "is not", null)
      .where("disabled", "!=", 1)
      .where("createdAt", ">=", startDate.toISOString())
      .where("createdAt", "<=", endDate.toISOString())
      .selectAll(),
  );

  const reports = crs.data?.map((cr) => ({ id: cr.id, name: getPDFInMailName(cr) })) ?? [];

  return (
    <Flex gap="0px" flexDirection="column" width="100%">
      <Title anchor="download">3. Télécharger mes CR</Title>
      <DateRangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <Box mb="16px">
        Pour une expérience optimale, nous vous invitons à <b>privilégier le mode Wi-Fi</b> pour le téléchargement de
        vos comptes-rendus dont le poids peut être important.
      </Box>
      <Box bgcolor="background-alt-blue-france" px="24px" pt="18px" pb="4px">
        {reports.length ? (
          <Download
            label={getZipFilename(startDate, endDate)}
            details={`ZIP - ${reports.length} compte${reports.length > 1 ? "s" : ""} rendu${reports.length > 1 ? "s" : ""}`}
            linkProps={{ onClick: () => downloadMutation.mutate(reports) }}
          />
        ) : (
          <Box pb="14px">Aucun CR disponible sur la période sélectionnée.</Box>
        )}
      </Box>
    </Flex>
  );
};

const ChangeUDAP = ({ onSuccess }: { onSuccess: () => void }) => {
  const user = useLiveUser()!;
  const udap = user.udap;

  const [selectedUdapId, setSelectedUdapId] = useState<string | null>(null);

  const udapsQuery = useQuery({
    queryKey: ["udaps", udap.id],
    queryFn: async () => {
      const response = await api.get("/api/udaps");
      const filteredResponse = response.filter((u) => u.id !== udap.id);
      if (filteredResponse.length === 1) {
        setSelectedUdapId(filteredResponse[0].id);
      }
      return filteredResponse;
    },
    onError: (error) => console.error(error),
  });

  const changeUdapMutation = useMutation(async (udap_id: string) => {
    const udap = udapsQuery.data?.find((u) => u.id === udap_id);
    if (!udap) return;
    await api.post("/api/change-udap", {
      body: { udap_id },
    });

    onSuccess?.();
  });

  const { css } = useStyles();

  return (
    <Flex gap="0px" flexDirection="column" width="100%">
      <Title anchor="change-udap">4. Changer d'UDAP</Title>
      {/* @ts-ignore */}
      <Alert
        style={{
          marginTop: "16px",
          marginBottom: "16px",
        }}
        small={false}
        closable={false}
        severity="warning"
        description={
          <p>
            À noter : si vous changez d’UDAP, vous n’aurez plus accès à vos CR actuels et vos paramètres seront ceux
            ceux de votre nouvelle équipe. Cette action reste néanmoins réversible, vous pourrez changer à nouveau
            d’UDAP et retrouver vos CR.
            <br />
            <br />
            N’oubliez pas d’enregistrer pour mettre à jour vos paramètres.
          </p>
        }
      />

      <Flex gap={{ xs: 0, lg: "16px" }} flexDirection={{ xs: "column", lg: "row" }} width="100%">
        <Input
          classes={{
            nativeInputOrTextArea: css({ pr: "32px" }),
          }}
          label="Mon UDAP"
          disabled
          nativeInputProps={{ value: udap.name! }}
        />
        <Select
          label="Nouvelle UDAP"
          nativeSelectProps={{
            onChange: (e) => {
              setSelectedUdapId(e.target.value);
            },
            value: selectedUdapId ?? undefined,
          }}
          // nativeSelectProps={form.register("udap_id", { required: "L'UDAP est requis" })}
          // state={formErrors.udap_id ? "error" : undefined}
          // stateRelatedMessage={formErrors.udap_id?.message}
        >
          <option value="" disabled hidden>
            Sélectionnez une UDAP
          </option>
          {udapsQuery.data?.map((udap) => (
            <option key={udap.id} value={udap.id}>
              {udap.name}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex justifyContent="flex-end" width="100%" mt="24px">
        <Button
          iconId="ri-save-3-line"
          iconPosition="left"
          disabled={!selectedUdapId}
          type="button"
          onClick={() => {
            if (!selectedUdapId) return;

            changeUdapMutation.mutate(selectedUdapId!);
          }}
        >
          Enregistrer
        </Button>
      </Flex>
    </Flex>
  );
};

const getZipFilename = (startDate: Date, endDate: Date) => {
  const formatDate = (date: Date) => format(date, "ddMMyy");

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  return `mes-CR-${start}-${end}.zip`;
};

const Title = ({ children, anchor }: { children: React.ReactNode; anchor?: string }) => {
  return (
    <Typography variant="h3" id={anchor} mb="24px" fontSize="26px">
      {children}
    </Typography>
  );
};

export const TitleH3 = Title;

export const Route = createFileRoute("/account")({
  component: () => (
    <EnsureUser>
      <AccountPage />
    </EnsureUser>
  ),
});
