import { createFileRoute } from "@tanstack/react-router";
import { Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import Summary from "@codegouvfr/react-dsfr/Summary";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMemo, useState } from "react";
import { db, useDbQuery } from "../db/db";
import { Spinner } from "#components/Spinner";
import { ServiceInstructeurs } from "../db/AppSchema";
import { Chip, ControlledChip } from "#components/Chip";
import { useRefreshUdap, useUser } from "../contexts/AuthContext";
import { EnsureUser } from "#components/EnsureUser";
import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";
import { ClauseV2 } from "../../../backend/src/db-types";
import { addDays, endOfYear, startOfYear } from "date-fns";
import { Udap } from "../db/AppSchema";
import { omit } from "pastable";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { AccordionIfMobile, BreadcrumbNav } from "./account";

const UdapPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
    document.getElementById("root")?.scrollTo(0, 0);
  };

  return (
    <Flex
      gap={{ base: "0", lg: "40px" }}
      flexDir={{ base: "column", lg: "row" }}
      justifyContent="center"
      alignItems="flex-start"
      w="100%"
      mb="40px"
    >
      <Stack w="100%">
        <BreadcrumbNav label="UDAP" />
        <styled.h1 mt="16px" mb="32px" px={{ base: "16px" }}>
          UDAP
        </styled.h1>
        <AccordionIfMobile>
          <Summary
            className={css({
              pt: "0",
              bgColor: "transparent !important",
            })}
            links={[
              { linkProps: { href: "#udap-informations" }, text: "Informations UDAP" },
              { linkProps: { href: "#services-instructeurs" }, text: "Services instructeurs" },
              { linkProps: { href: "#clauses-departementales" }, text: "Clauses départementales" },
              { linkProps: { href: "#rapport-activite" }, text: "Rapport d'activité" },
            ]}
          />
        </AccordionIfMobile>
      </Stack>
      <Divider hideFrom="lg" w="90%" ml="5%" color="background-action-low-blue-france-hover" />
      <Center
        flexDir="column"
        alignItems="flex-start"
        maxW="900px"
        mt="32px"
        px={{ base: "16px", lg: "0" }}
        textAlign="left"
      >
        {isSuccess ? <SuccessAlert /> : null}
        <UDAPForm onSuccess={onSuccess} />
        <Divider my={{ base: "48px", lg: "48px" }} color="background-action-low-blue-france-hover" />
        <ServicesList />
        <Divider my={{ base: "48px", lg: "48px" }} color="background-action-low-blue-france-hover" />
        <Clauses />
        <Divider my={{ base: "48px", lg: "48px" }} color="background-action-low-blue-france-hover" />
        <Activity />
      </Center>
    </Flex>
  );
};

const replaceCarriageReturn = (text: string) => {
  return text.replaceAll("\n", " ");
};

const format = {
  marianne_text: (text: string) => {
    const [firstLine, ...rest] = text.split(" ");
    const threeWords = rest.slice(0, 3).join(" ");
    const restText = rest.slice(3).join(" ");

    return `${firstLine}\n${threeWords}\n${restText}`;
  },
  drac_text: (text: string) => {
    const splitted = text.split(" ");
    const fourWords = splitted.slice(0, 4).join(" ");
    const restText = splitted.slice(4).join(" ");
    return `${fourWords}\n${restText}`;
  },
  udap_text: (text: string) => {
    const splitted = text.split(" ");
    const threeWords = splitted.slice(0, 3).join(" ");
    const restText = splitted.slice(3).join(" ");
    return `${threeWords}\n${restText}`;
  },
};

const UDAPForm = ({ onSuccess }) => {
  const udap = useUser().udap;
  const [udapData, setUdapData] = useState({
    ...udap,
    marianne_text: replaceCarriageReturn(udap.marianne_text ?? ""),
    drac_text: replaceCarriageReturn(udap.drac_text ?? ""),
    udap_text: replaceCarriageReturn(udap.udap_text ?? ""),
  });

  const refreshUdapMutation = useRefreshUdap();

  const saveUdapMutation = useMutation({
    mutationFn: async (udapData: Partial<Udap>) => {
      const value = {
        ...omit(udapData, ["id"]),
        marianne_text: format.marianne_text(udapData.marianne_text ?? ""),
        drac_text: format.drac_text(udapData.drac_text ?? ""),
        udap_text: format.udap_text(udapData.udap_text ?? ""),
      };

      await db.updateTable("udap").set(value).where("id", "=", udap.id).execute();
      await refreshUdapMutation.mutateAsync();
      onSuccess?.();
    },
  });

  return (
    <Flex gap="0px" flexDir="column" w="100%">
      <Title anchor="udap-informations">1. Informations UDAP</Title>
      <Input
        className={css({ w: "100%", mt: "16px" })}
        label="Intitulé marianne préfet"
        hintText="Ex : Préfet de la région Nouvelle-Aquitaine"
        nativeInputProps={{
          value: udapData.marianne_text ?? "",
          onChange: (e) => setUdapData({ ...udapData, marianne_text: e.target.value }),
        }}
      />
      <Input
        className={css({ w: "100%" })}
        label="Intitulé DRAC"
        hintText="Ex : Direction régionale des affaires culturelles de Nouvelle-Aquitaine"
        nativeInputProps={{
          value: udapData.drac_text ?? "",
          onChange: (e) => setUdapData({ ...udapData, drac_text: e.target.value }),
        }}
      />
      <Input
        className={css({ w: "100%" })}
        label="Intitulé UDAP"
        hintText="Ex : Unité départementale de l'architecture et du patrimoine des Deux-Sèvres"
        nativeInputProps={{
          value: udapData.udap_text ?? "",
          onChange: (e) => setUdapData({ ...udapData, udap_text: e.target.value }),
        }}
      />

      <Flex gap={{ base: 0, lg: "24px" }} flexDir={{ base: "column", lg: "row" }} w="100%">
        <Input
          className={css({ w: "100%" })}
          label="Téléphone UDAP"
          nativeInputProps={{
            value: udapData.phone ?? "",
            onChange: (e) => setUdapData({ ...udapData, phone: e.target.value }),
          }}
        />
        <Input
          className={css({ w: "100%" })}
          label="Courriel UDAP"
          nativeInputProps={{
            value: udapData.email ?? "",
            onChange: (e) => setUdapData({ ...udapData, email: e.target.value }),
          }}
        />
      </Flex>

      {/* TODO: set this */}
      {/* <Input className={css({ w: "100%" })} label="Lien où déposer l'avant projet" hintText="Figurera dans le CR" /> */}

      <Flex gap="16px" justifyContent="flex-end" w="100%" mt="24px">
        <Button
          iconId="ri-save-3-line"
          iconPosition="left"
          type="button"
          onClick={() => {
            saveUdapMutation.mutate(udapData);
          }}
        >
          Enregistrer
        </Button>
      </Flex>
    </Flex>
  );
};

const ServicesList = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partial<ServiceInstructeurs> | null>(null);
  const udap = useUser().udap;

  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title anchor="services-instructeurs">2. Services instructeurs</Title>
      <Flex gap="16px" alignItems="center">
        <div>
          <Button
            priority="secondary"
            iconId="ri-add-line"
            iconPosition="left"
            type="button"
            onClick={() => {
              setSelected({ full_name: "", short_name: "", tel: "", email: "", udap_id: udap.id });
            }}
          >
            Ajouter
          </Button>
        </div>
        <Input
          className={css({ mb: "8px" })}
          nativeInputProps={{ placeholder: "Rechercher", value: search, onChange: (e) => setSearch(e.target.value) }}
          iconId="ri-search-line"
          label={null}
        />
      </Flex>
      <ServicePicker search={search} selected={selected} setSelected={setSelected} />
      <ServiceForm selected={selected} setSelected={setSelected} />
    </Flex>
  );
};

const ServicePicker = ({
  search,
  selected,
  setSelected,
}: {
  search: string;
  selected: Partial<ServiceInstructeurs> | null;
  setSelected: (item: Partial<ServiceInstructeurs> | null) => void;
}) => {
  const services = useDbQuery(db.selectFrom("service_instructeurs").selectAll());

  if (services.isLoading) return <Spinner />;

  const rawItems = services.data ?? [];
  const items = rawItems.filter((item) => item.short_name?.toLowerCase().includes(search.toLowerCase()));

  const byFirstLetter = items.reduce(
    (acc, item) => {
      const name = item.short_name?.startsWith("CC ") ? item.short_name.slice(3) : item.short_name;

      const firstLetter = name?.charAt(0).toUpperCase() ?? "";
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    },
    {} as Record<string, ServiceInstructeurs[]>,
  );

  return (
    <Flex gap="24px" flexDir="column" w="100%">
      {Object.entries(byFirstLetter)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, items]) => (
          <Flex key={letter} gap="8px">
            <styled.div w="34px" minW="34px" mt="2px" color="text-action-high-blue-france" fontSize="24px">
              {letter}
            </styled.div>
            <Flex gap="8px" flexWrap="wrap">
              {items.map((item) => (
                <Chip
                  className={css({
                    whiteSpace: "nowrap",
                  })}
                  key={item.id}
                  onCheckChange={() => setSelected(selected === item ? null : item)}
                  isChecked={selected?.id === item.id}
                >
                  {item.short_name}
                </Chip>
              ))}
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export const useScrollToRef = () => {
  const scrollToRef = (element: any) => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return scrollToRef;
};

const ServiceForm = ({
  selected,
  setSelected,
}: {
  selected: Partial<ServiceInstructeurs> | null;
  setSelected: (item: Partial<ServiceInstructeurs> | null) => void;
}) => {
  const scrollToRef = useScrollToRef();
  if (!selected) return null;
  const isNew = !selected.id;

  const createOrEditServiceMutation = useMutation({
    mutationFn: async (service: Partial<ServiceInstructeurs>) => {
      if (!service.udap_id) throw new Error("udap_id is required");
      if (!service.short_name) throw new Error("short_name is required");

      if (service.id) {
        await db.updateTable("service_instructeurs").set(service).where("id", "=", service.id).execute();
      } else {
        await db
          .insertInto("service_instructeurs")
          .values({ ...service, id: v4() })
          .execute();
      }

      setSelected(null);
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (service: Partial<ServiceInstructeurs>) => {
      if (!service.id) throw new Error("id is required");
      await db.deleteFrom("service_instructeurs").where("id", "=", service.id).execute();
      setSelected(null);
    },
  });

  return (
    <Flex ref={scrollToRef} gap="16px" flexDir="column" w="100%">
      <Input
        className={css({ w: "100%" })}
        label="Intitulé service instructeur"
        nativeInputProps={{
          value: selected.full_name ?? "",
          onChange: (e) => setSelected({ ...selected, full_name: e.target.value }),
        }}
      />

      <Flex gap="24px" w="100%">
        <Input
          className={css({ w: "100%" })}
          label="Abréviation"
          nativeInputProps={{
            value: selected.short_name ?? "",
            onChange: (e) => setSelected({ ...selected, short_name: e.target.value }),
          }}
        />
        <Input
          className={css({ w: "100%" })}
          label="Téléphone"
          nativeInputProps={{
            value: selected.tel ?? "",
            onChange: (e) => setSelected({ ...selected, tel: e.target.value }),
          }}
        />
      </Flex>
      <Input
        className={css({ w: "100%" })}
        label="Courriel"
        nativeInputProps={{
          value: selected.email ?? "",
          onChange: (e) => setSelected({ ...selected, email: e.target.value }),
        }}
      />

      <Flex gap="16px" justifyContent="flex-end" w="100%">
        {!isNew ? (
          <Button
            className={css({
              color: "background-flat-error",
              boxShadow: "inset 0 0 0 1px var(--colors-background-flat-error)",
            })}
            priority="secondary"
            type="button"
            onClick={() => deleteServiceMutation.mutate(selected)}
          >
            Supprimer
          </Button>
        ) : null}
        <Button
          iconId="ri-save-3-line"
          iconPosition="left"
          type="button"
          onClick={() => {
            createOrEditServiceMutation.mutate(selected);
          }}
        >
          {isNew ? "Créer" : "Modifier"}
        </Button>
      </Flex>
    </Flex>
  );
};

const Clauses = () => {
  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title anchor="clauses-departementales">3. Clauses départementales</Title>
      <div>Pensez à faire des contenus courts et explicites pour vos lecteurs.</div>

      <SingleClause clauseKey="contacts-utiles" title="Contacts utiles" />
      <Divider
        w={{ base: "100%", lg: "calc(100% - 104px)" }}
        my={{ base: "20px", lg: "40px" }}
        ml={{ base: "0", lg: "102px" }}
        color="background-action-low-blue-france-hover"
      />
      <SingleClause clauseKey="bonnes-pratiques" title="Bonnes pratiques" />
    </Flex>
  );
};

const SingleClause = ({ clauseKey, title }: { clauseKey: string; title: string }) => {
  const [selected, setSelected] = useState<Partial<ClauseV2> | null>(null);
  const udap = useUser()!.udap;

  const clausesQuery = useDbQuery(
    db.selectFrom("clause_v2").where("key", "=", clauseKey).where("udap_id", "in", ["ALL", udap.id]).selectAll(),
  );

  return (
    <Flex gap="16px" flexDir="column" ml={{ base: 0, lg: "102px" }}>
      <styled.div fontSize="20px">{title}</styled.div>
      <Button
        priority="secondary"
        iconId="ri-add-line"
        iconPosition="left"
        type="button"
        onClick={() => {
          setSelected({ key: clauseKey, text: "", udap_id: udap.id, value: "", position: 0 });
        }}
      >
        Ajouter
      </Button>
      <div>Sélectionnez pour modifier ou supprimer</div>
      <Flex gap="8px" flexWrap="wrap">
        {clausesQuery.isLoading ? (
          <Spinner />
        ) : (
          clausesQuery.data
            ?.map((c) => ({ ...c, text: c.text?.replaceAll("\\n", "\n") ?? "" }))
            .map((clause) => (
              <Chip
                key={clause.id}
                onCheckChange={() => setSelected(selected?.id === clause?.id ? null : (clause as ClauseV2))}
                isChecked={selected?.id === clause.id}
              >
                {clause.value}
              </Chip>
            ))
        )}
      </Flex>

      {selected ? <ClauseForm selected={selected} setSelected={setSelected} /> : null}
    </Flex>
  );
};

const ClauseForm = ({
  selected,
  setSelected,
}: {
  selected: Partial<ClauseV2> | null;
  setSelected: (item: Partial<ClauseV2> | null) => void;
}) => {
  const scrollToRef = useScrollToRef();
  if (!selected) return null;

  const isNew = !selected.id;

  const createOrEditClauseMutation = useMutation({
    mutationFn: async (clause: Partial<ClauseV2>) => {
      if (!clause.udap_id) throw new Error("udap_id is required");
      if (!clause.key) throw new Error("key is required");

      if (clause.id) {
        await db.updateTable("clause_v2").set(clause).where("id", "=", clause.id).execute();
      } else {
        await db
          .insertInto("clause_v2")
          .values({ ...clause, id: v4() })
          .execute();
      }

      setSelected(null);
    },
  });

  const deleteClauseMutation = useMutation({
    mutationFn: async (clause: Partial<ClauseV2>) => {
      if (!clause.id) throw new Error("id is required");
      await db.deleteFrom("clause_v2").where("id", "=", clause.id).execute();
      setSelected(null);
    },
  });

  return (
    <Flex ref={scrollToRef} gap="16px" flexDir="column" w="100%">
      <Input
        className={css({ w: "100%" })}
        label="Intitulé clause"
        nativeInputProps={{
          value: selected.value ?? "",
          onChange: (e) => setSelected({ ...selected, value: e.target.value }),
        }}
      />

      <Flex gap="24px" w="100%">
        <Input
          className={css({ w: "100%" })}
          label="Texte"
          nativeTextAreaProps={{
            rows: 5,
            value: selected.text ?? "",
            onChange: (e) => setSelected({ ...selected, text: e.target.value }),
          }}
          textArea
        />
      </Flex>

      <Flex gap="16px" justifyContent="flex-end" w="100%">
        {!isNew ? (
          <Button
            className={css({
              color: "background-flat-error",
              boxShadow: "inset 0 0 0 1px var(--colors-background-flat-error)",
            })}
            priority="secondary"
            type="button"
            onClick={() => deleteClauseMutation.mutate(selected)}
          >
            Supprimer
          </Button>
        ) : null}
        <Button
          iconId="ri-save-3-line"
          iconPosition="left"
          type="button"
          onClick={() => {
            createOrEditClauseMutation.mutate(selected);
          }}
        >
          {isNew ? "Créer" : "Modifier"}
        </Button>
      </Flex>
    </Flex>
  );
};

const Activity = () => {
  const user = useUser();
  const [startDate, setStartDate] = useState(datePresets[0].startDate);
  const [endDate, setEndDate] = useState(datePresets[0].endDate);

  const query = useDbQuery(
    db
      .selectFrom("report")
      .where("udap_id", "=", user.udap.id)
      .where("createdBy", "=", user.id)
      .where("createdAt", ">=", startDate.toISOString())
      .where("createdAt", "<=", endDate.toISOString())
      .where("pdf", "is not", null)
      .select((eb) => [eb.fn.count("id").as("count")]),
  );

  const udapQuery = useDbQuery(
    db
      .selectFrom("report")
      .where("udap_id", "=", user.udap.id)
      .where("createdAt", ">=", startDate.toISOString())
      .where("createdAt", "<=", endDate.toISOString())
      .where("pdf", "is not", null)
      .select((eb) => [eb.fn.count("id").as("count")]),
  );

  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title anchor="rapport-activite">4. Rapport d'activité</Title>

      <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

      <Flex gap="8px" flexDir={{ base: "column", lg: "row" }} w="100%">
        <Center
          flexDir="column"
          alignItems="center"
          borderRadius="5px"
          w="100%"
          h="215px"
          textAlign="center"
          bg="green-emeraude-975-75"
        >
          <div>CR envoyés par {user.name} :</div>
          <div>{query.isLoading ? <Spinner /> : <div>{query.data?.[0]?.count}</div>}</div>
        </Center>
        <Center
          flexDir="column"
          alignItems="center"
          borderRadius="5px"
          w="100%"
          h="215px"
          textAlign="center"
          bg="green-emeraude-975-75"
        >
          <div>CR envoyés par l'UDAP :</div>
          <div>{query.isLoading ? <Spinner /> : <div>{udapQuery.data?.[0]?.count}</div>}</div>
        </Center>
      </Flex>
    </Flex>
  );
};

export const datePresets = [
  {
    label: "Dernier mois",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  },
  {
    label: "3 derniers mois",
    startDate: new Date(new Date().setDate(new Date().getDate() - 90)),
    endDate: new Date(),
  },
  {
    label: "Année " + new Date().getFullYear(),
    startDate: startOfYear(new Date()),
    endDate: endOfYear(new Date()),
  },
];

export const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
}) => {
  const isPresetSelected = (preset: (typeof datePresets)[0]) => {
    return startDate.getTime() === preset.startDate.getTime() && endDate.getTime() === preset.endDate.getTime();
  };

  return (
    <Flex gap={{ base: 0, lg: "16px" }} flexDir={{ base: "column", lg: "row" }}>
      <Input
        label="Date de début"
        nativeInputProps={{
          type: "date",
          value: startDate.toISOString().split("T")[0],
          onChange: (e) => {
            if (new Date(e.target.value) > endDate) {
              setEndDate(new Date(e.target.value));
            }
            setStartDate(new Date(e.target.value));
          },
        }}
      />
      <Input
        label="Date de fin"
        nativeInputProps={{
          type: "date",
          value: endDate.toISOString().split("T")[0],
          onChange: (e) => {
            if (new Date(e.target.value) < startDate) {
              setStartDate(new Date(e.target.value));
            }
            setEndDate(new Date(e.target.value));
          },
        }}
      />

      <Flex gap="8px" flexDir="row" alignItems="flex-end">
        {datePresets.map((preset) => (
          <styled.div key={preset.label} mb="1.5rem">
            <ControlledChip
              onClick={() => {
                setStartDate(preset.startDate);
                setEndDate(preset.endDate);
              }}
              isChecked={isPresetSelected(preset)}
            >
              {preset.label}
            </ControlledChip>
          </styled.div>
        ))}
      </Flex>
    </Flex>
  );
};

const Title = ({ children, anchor }: { children: React.ReactNode; anchor?: string }) => {
  return (
    <styled.h3 id={anchor} mb="0" fontSize="26px">
      {children}
    </styled.h3>
  );
};

export const Route = createFileRoute("/udap")({
  component: () => (
    <EnsureUser>
      <UdapPage />
    </EnsureUser>
  ),
});

export const SuccessAlert = () => {
  return (
    <Alert
      className={css({ mb: "32px" })}
      severity="success"
      closable={false}
      small={false}
      description={"Vos modifications ont bien été prises en compte."}
    ></Alert>
  );
};
