import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { useUser } from "../../contexts/AuthContext";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { useMutation } from "@tanstack/react-query";
import { css } from "#styled-system/css";
import { MenuTitle } from "./MenuTitle";
import { ClauseFormBanner } from "./ClauseMenu";
import { fr } from "@codegouvfr/react-dsfr";
import { db, useDbQuery } from "../../db/db";
import { Delegation, User } from "../../db/AppSchema";
import { v4 } from "uuid";

export const ShareReport = ({ backButtonOnClick }: { backButtonOnClick: () => void }) => {
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
        <ManageDelegations coworkers={coworkers ?? []} delegations={delegations ?? []} />
      </Stack>

      <Stack mt="49px" px="20px" color="#757575">
        <styled.div>Ces personnes vous permettent de créer, modifier et supprimer leurs CR :</styled.div>
        <styled.ul>
          {delegatedToMe?.map((delegation) => (
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

  // TODO: add string id everywhere in the db
  const createMutation = useMutation((delegation: Omit<Delegation, "id">) =>
    db
      .insertInto("delegation")
      .values({ ...delegation, id: v4() })
      .execute(),
  );
  // TODO: test this
  const removeMutation = useMutation((delegation: Delegation) =>
    db.deleteFrom("delegation").where("id", "=", delegation.id).execute(),
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
