import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { useLiveQuery } from "electric-sql/react";
import { useUser } from "../../contexts/AuthContext";
import { db } from "../../db";
import { Delegation, User } from "@cr-vif/electric-client/frontend";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { useMutation } from "@tanstack/react-query";
import { css } from "#styled-system/css";
import { MenuTitle } from "./MenuTitle";
import { ClauseFormBanner } from "./ClauseMenu";
import { fr } from "@codegouvfr/react-dsfr";

export const ShareReport = ({ backButtonOnClick }: { backButtonOnClick: () => void }) => {
  const user = useUser()!;

  const coworkersQuery = useLiveQuery(
    db.user.liveMany({
      where: {
        udap_id: user.udap_id,
        id: { not: user.id },
      },
    }),
  );

  const delegationsQuery = useLiveQuery(
    db.delegation.liveMany({
      where: {
        createdBy: user.id,
      },
    }),
  );

  const delegatedToMeQuery = useLiveQuery(
    db.delegation.liveMany({
      where: {
        delegatedTo: user.id,
      },
      include: {
        user_delegation_createdByTouser: true,
      },
    }),
  );

  return (
    <>
      <MenuTitle
        backButtonOnClick={backButtonOnClick}
        alert={
          <ClauseFormBanner
            status="idle"
            icon={fr.cx("fr-icon-alert-fill")}
            text={`Tous les agents de l'UDAP peuvent voir et télécharger les compte-rendus envoyés. Seuls ceux à qui vous avez donné le droit peuvent créer, modifier, et supprimer vos compte-rendus. Le compte-rendu est attribué à un agent via le champ "rédigé par" du formulaire.`}
          />
        }
      >
        Partage des CR
      </MenuTitle>
      {/* <Divider hideFrom="lg" height="2px" my={{ base: "20px", lg: "44px" }} color="#C1C1FB" /> */}

      <Stack w="100%" px="20px">
        <styled.div>Ces personnes peuvent créer, modifier et supprimer vos CR : </styled.div>
        <ManageDelegations coworkers={coworkersQuery.results ?? []} delegations={delegationsQuery.results ?? []} />
      </Stack>

      <Stack mt="49px" px="20px" color="#757575">
        <styled.div>Ces personnes vous permettent de créer, modifier et supprimer leurs CR :</styled.div>
        <styled.ul>
          {delegatedToMeQuery.results?.map((delegation) => (
            <styled.li key={delegation.createdBy}>
              {(delegation as any).user_delegation_createdByTouser?.name}
            </styled.li>
          ))}
        </styled.ul>
      </Stack>
    </>
  );
};

const ManageDelegations = ({ coworkers, delegations }: { coworkers: User[]; delegations: Delegation[] }) => {
  const user = useUser()!;

  const createMutation = useMutation((delegation: Delegation) => db.delegation.create({ data: delegation }));
  const removeMutation = useMutation((delegation: Delegation) =>
    db.delegation.deleteMany({
      where: {
        createdBy: delegation.createdBy,
        delegatedTo: delegation.delegatedTo,
      },
    }),
  );

  return (
    <>
      {coworkers.map((coworker) => {
        const delegation = delegations.find((del) => del.delegatedTo === coworker.id);
        return (
          <Flex key={coworker.id} w="100%">
            <ToggleSwitch
              className={css({ w: "100%" })}
              label={coworker.name!}
              showCheckedHint={false}
              inputTitle={coworker.name!}
              checked={!!delegation}
              onChange={(e) =>
                e
                  ? createMutation.mutate({ createdBy: user.id, delegatedTo: coworker.id })
                  : removeMutation.mutate(delegation!)
              }
            />
            {/* <styled.div>{coworker.name}</styled.div> */}
          </Flex>
        );
      })}
    </>
  );
};
