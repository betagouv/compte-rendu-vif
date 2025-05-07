import { createFileRoute } from "@tanstack/react-router";
import { Center, Flex, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";

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
  return (
    <Flex gap="16px" flexDir="column" w="100%">
      <Title>2. Services instructeurs</Title>
      <Flex gap="16px" alignItems="center">
        <div>
          <Button priority="secondary" iconId="ri-add-line" iconPosition="left">
            Ajouter
          </Button>
        </div>
        <Input
          className={css({ mb: "6px" })}
          nativeInputProps={{ placeholder: "Rechercher" }}
          iconId="ri-search-line"
          label={null}
        />
      </Flex>
    </Flex>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <styled.h2>{children}</styled.h2>;
};

export const Route = createFileRoute("/udap")({
  component: Udap,
});
