import { EnsureUser } from "#components/EnsureUser.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import Summary from "@codegouvfr/react-dsfr/Summary";
import Download from "@codegouvfr/react-dsfr/Download";
import { css } from "#styled-system/css";
import { useUserSettings } from "../hooks/useUserSettings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db, useDbQuery } from "../db/db";
import { AuthContext, useRefreshUdap, useRefreshUser, useUser } from "../contexts/AuthContext";
import { v4 } from "uuid";
import { Spinner } from "#components/Spinner";
import { EmailInput } from "../components/EmailInput";
import { Delegation, User } from "../db/AppSchema";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";
import { Chip } from "#components/Chip";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { api } from "../api";
import JSZip from "jszip";
import { downloadFile } from "../utils";
import { datePresets, DateRangePicker, SuccessAlert } from "./udap";
import { PropsWithChildren, ReactNode, useContext, useState } from "react";
import { format, subDays } from "date-fns";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import Button from "@codegouvfr/react-dsfr/Button";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { getPDFInMailName } from "@cr-vif/pdf";

const AccountPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
    document.getElementById("root")?.scrollTo(0, 0);
  };

  return (
    <Flex
      gap={{ base: "0", lg: "80px" }}
      flexDir={{ base: "column", lg: "row" }}
      justifyContent="center"
      alignItems={{ lg: "flex-start", base: "center" }}
      w="100%"
      mb="40px"
    >
      <Stack w="100%">
        <BreadcrumbNav label="Mon compte" />
        <styled.h1 mt="16px" mb="32px" px={{ base: "16px" }}>
          Mon compte
        </styled.h1>
        <AccordionIfMobile>
          <Summary
            className={css({
              px: "16px ",
              bgColor: "transparent !important",
            })}
            links={[
              { linkProps: { href: "#default-recipient" }, text: "Destinataire par défaut" },
              { linkProps: { href: "#share" }, text: "Droit d'édition partagé" },
              { linkProps: { href: "#download" }, text: "Télécharger mes CR" },
              { linkProps: { href: "#change-udap" }, text: "Changer d'UDAP" },
            ]}
          />
        </AccordionIfMobile>
      </Stack>
      <Divider hideFrom="lg" w="90%" ml="5%" color="background-action-low-blue-france-hover" />
      <Center
        flex="1"
        flexDir="column"
        alignItems="flex-start"
        maxW="900px"
        mt="32px"
        px={{ base: "16px", lg: "0" }}
        textAlign="left"
      >
        {isSuccess ? <SuccessAlert /> : null}
        <DefaultRecipient />
        <Divider my={{ base: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <Share />
        <Divider my={{ base: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <DownloadCRs />
        <Divider my={{ base: "48px", lg: "80px" }} color="background-action-low-blue-france-hover" />
        <ChangeUDAP onSuccess={onSuccess} />
      </Center>
    </Flex>
  );
};

export const AccordionIfMobile = ({ children }: { children: NonNullable<ReactNode> }) => {
  return (
    <>
      <Accordion
        className={css({
          hideFrom: "lg",
          mx: "16px",
          "& .fr-summary__title": { display: "none" },
          "& .fr-summary": { pt: "0" },
        })}
        label="Sommaire"
      >
        {children}
      </Accordion>

      <styled.div hideBelow="lg" mb="32px" px="16px">
        {children}
      </styled.div>
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
    <Flex gap="0px" flexDir="column" w="100%">
      <Title anchor="default-recipient">1. Destinataire par défaut</Title>
      <styled.div>
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
      </styled.div>
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
    <Flex gap="0px" flexDir="column" w="100%">
      <Title anchor="share">2. Droit d'édition partagé</Title>
      {coworkers.length ? (
        <styled.div>
          <styled.div mb="16px">Ces personnes peuvent créer, modifier et supprimer vos CR : </styled.div>
          <ManageDelegations coworkers={coworkers} delegations={delegations} />
          {delegatedToMe.length ? (
            // @ts-ignore alert needs a title ?
            <Alert
              className={css({
                mt: "16px",
              })}
              small={false}
              closable={false}
              severity="info"
              description={
                delegatedToMe.map((user) => user.createdByName).join(", ") +
                ` vous autorise${delegatedToMe.length > 1 ? "nt" : ""} à créer, modifier et supprimer ${delegatedToMe.length > 1 ? "leurs" : "ses"} CRs.`
              }
            />
          ) : null}
        </styled.div>
      ) : (
        <Alert
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
      <styled.nav w="100%" mt="32px" mb="0 !important" px="16px">
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
            className={css({
              whiteSpace: "nowrap",
            })}
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
    <Flex gap="0px" flexDir="column" w="100%">
      <Title anchor="download">3. Télécharger mes CR</Title>
      <DateRangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <styled.div mb="16px">
        Pour une expérience optimale, nous vous invitons à <b>privilégier le mode Wi-Fi</b> pour le téléchargement de
        vos comptes-rendus dont le poids peut être important.
      </styled.div>
      <styled.div px="24px" pt="18px" pb="4px" bgColor="background-alt-blue-france">
        {reports.length ? (
          <Download
            label={getZipFilename(startDate, endDate)}
            details={`ZIP - ${reports.length} compte${reports.length > 1 ? "s" : ""} rendu${reports.length > 1 ? "s" : ""}`}
            linkProps={{ onClick: () => downloadMutation.mutate(reports) }}
          />
        ) : (
          <styled.div pb="14px">Aucun CR disponible sur la période sélectionnée.</styled.div>
        )}
      </styled.div>
    </Flex>
  );
};

const ChangeUDAP = ({ onSuccess }) => {
  const user = useUser()!;

  const udap = user.udap;
  const [selectedUdapId, setSelectedUdapId] = useState<string | null>(null);

  const { setData, ...data } = useContext(AuthContext);

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

    setData({ ...data, user: { ...data.user, udap_id, udap } as any });
    onSuccess?.();
  });

  return (
    <Flex gap="0px" flexDir="column" w="100%">
      <Title anchor="change-udap">4. Changer d'UDAP</Title>
      {/* @ts-ignore */}
      <Alert
        className={css({
          mt: "16px",
          mb: "16px",
        })}
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

      <Flex gap={{ base: 0, lg: "16px" }} flexDir={{ base: "column", lg: "row" }} w="100%">
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

      <Flex justifyContent="flex-end" w="100%" mt="24px">
        <Button
          iconId="ri-save-3-line"
          iconPosition="left"
          disabled={!selectedUdapId}
          type="button"
          onClick={() => {
            if (!selectedUdapId) return;
            console.log(selectedUdapId);

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
    <styled.h3 id={anchor} mb="24px" fontSize="26px">
      {children}
    </styled.h3>
  );
};

export const Route = createFileRoute("/account")({
  component: () => (
    <EnsureUser>
      <AccountPage />
    </EnsureUser>
  ),
});
