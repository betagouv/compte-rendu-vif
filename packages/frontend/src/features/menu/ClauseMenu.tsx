import { useLiveQuery } from "electric-sql/react";
import { db } from "../../db";
import { Spinner } from "#components/Spinner";
import { groupBy } from "pastable";
import { useUser } from "../../contexts/AuthContext";
import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { Fragment } from "react/jsx-runtime";

export const ClauseMenu = ({ isNational }: { isNational: boolean }) => {
  const user = useUser()!;

  const clausesQuery = useLiveQuery(
    db.clause.liveMany({
      where: {
        key: {
          in: isNational ? ["type-espace", "decision"] : ["contacts-utiles", "bonnes-pratiques"],
        },
        OR: [{ udap_id: "ALL" }, { udap_id: user.udap_id! }],
      },
    }),
  );

  if (!clausesQuery.updatedAt) return <Spinner />;

  const groupedByKey = groupBy(clausesQuery.results ?? [], "key");

  return (
    <>
      <Divider height="2px" my={{ base: "27px", lg: "44px" }} color="#C1C1FB" />
      <Stack>
        {Object.entries(groupedByKey).map(([key, clauses], index) => (
          <Fragment key={key}>
            <Stack gap="16px">
              <styled.h2 fontSize="24px" fontWeight="bold">
                {(clauseNameMap as any)[key] ?? key}
              </styled.h2>
              {clauses.map((clause) => (
                <Flex key={clause.value} flexDir="column">
                  <styled.div color="text-action-high-blue-france" fontWeight="bold">
                    {clause.value}
                  </styled.div>
                  {clause.text.split("\\n").map((text, i) => {
                    return (
                      <styled.div key={i} whiteSpace="pre-wrap">
                        {text}
                      </styled.div>
                    );
                  })}
                </Flex>
              ))}
            </Stack>
            {index < Object.keys(groupedByKey).length - 1 && <Divider height="1px" my="16px" color="#C1C1FB" />}
          </Fragment>
        ))}
      </Stack>
    </>
  );
};

const clauseNameMap = {
  "type-espace": "Type d'espace",
  decision: "Décision",
  "contacts-utiles": "Contacts utiles",
  "bonnes-pratiques": "Bonnes pratiques",
};
