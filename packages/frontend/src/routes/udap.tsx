import { createFileRoute } from "@tanstack/react-router";
import { Center, Flex, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { db, useDbQuery } from "../db/db";
import { Spinner } from "#components/Spinner";
import { ServiceInstructeurs } from "../db/AppSchema";
import { Chip } from "#components/Chip";
import { useUser } from "../contexts/AuthContext";
import { EnsureUser } from "#components/EnsureUser";
import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";

const Udap = () => {
  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <div>lol</div>
      <Center flexDir="column" alignItems="flex-start" w="900px" mt="24px" textAlign="left">
        <UDAPForm />
        <ServicesList />
      </Center>
    </Flex>
  );
};

const UDAPForm = () => {
  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title>1. Informations UDAP</Title>
      <Input
        className={css({ w: "100%" })}
        label="Intitulé marianne préfet"
        hintText="Ex : Préfet de la région Nouvelle-Aquitaine"
      />
      <Input
        className={css({ w: "100%" })}
        label="Intitulé DRAC"
        hintText="Ex : Direction régionale des affaires culturelles de Nouvelle-Aquitaine"
      />
      <Input
        className={css({ w: "100%" })}
        label="Intitulé UDAP"
        hintText="Ex : Unité départementale de l'architecture et du patrimoine des Deux-Sèvres"
      />

      <Flex gap="24px" w="100%">
        <Input className={css({ w: "100%" })} label="Téléphone UDAP" />
        <Input className={css({ w: "100%" })} label="Courriel UDAP" />
      </Flex>

      <Input className={css({ w: "100%" })} label="Lien où déposer l'avant projet" hintText="Figurera dans le CR" />
    </Flex>
  );
};

const ServicesList = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partial<ServiceInstructeurs> | null>(null);
  const udap = useUser().udap;

  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title>2. Services instructeurs</Title>
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
    <Flex flexDir="column">
      {Object.entries(byFirstLetter)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, items]) => (
          <Flex key={letter} gap="8px">
            <div>{letter}</div>
            <Flex>
              {items.map((item) => (
                <Chip onCheckChange={() => setSelected(item)} isChecked={selected?.id === item.id}>
                  {item.short_name}
                </Chip>
              ))}
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

const ServiceForm = ({
  selected,
  setSelected,
}: {
  selected: Partial<ServiceInstructeurs> | null;
  setSelected: (item: Partial<ServiceInstructeurs> | null) => void;
}) => {
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
    <Flex gap="16px" flexDir="column" w="100%">
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

const Title = ({ children }: { children: React.ReactNode }) => {
  return <styled.h2>{children}</styled.h2>;
};

export const Route = createFileRoute("/udap")({
  component: () => (
    <EnsureUser>
      <Udap />
    </EnsureUser>
  ),
});
