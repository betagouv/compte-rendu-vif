import { Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
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
import { EmailInput } from "#components/EmailInput.tsx";
import { Spinner } from "#components/Spinner.tsx";
import { useUserSettings } from "../../hooks/useUserSettings";

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

  const { userSettings, isLoading: isUserSettingsLoading, existing } = useUserSettings();

  const selectedEmails =
    userSettings.default_emails
      ?.split(",")
      .map((email: string) => email.trim())
      .filter(Boolean) ?? [];

  const saveEmailsMutation = useMutation(async (emails: string[]) => {
    if (existing) {
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

      <Stack w="100%" px="20px">
        <styled.h4 mb="16px">Envois</styled.h4>
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
      </Stack>
      <Center>
        <Divider mx="24px" mt="16px" mb="24px" />
      </Center>

      <Stack w="100%" px="20px">
        <styled.h4 mb="16px">Droits d'édition</styled.h4>
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
