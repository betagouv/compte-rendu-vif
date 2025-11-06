import { Spinner } from "#components/Spinner";
import { Divider } from "#components/ui/Divider.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "@xstate/react";
import { groupBy } from "pastable";
import { Fragment } from "react/jsx-runtime";
import { useUser } from "../../contexts/AuthContext";
import { Clause_v2 } from "../../db/AppSchema";
import { db, useDbQuery } from "../../db/db";
import { menuActor } from "./menuMachine";
import { MenuTitle } from "./MenuTitle";

export const ClauseMenu = () => {
  const user = useUser()!;

  const clauseData = useSelector(menuActor, (state) => state.context.clause)!;

  const clausesQuery = useDbQuery(
    db
      .selectFrom("clause_v2")
      .where("key", "=", clauseData.clauseId)
      .where("service_id", "in", ["ALL", user.service_id])
      .selectAll(),
  );

  if (clausesQuery.isLoading)
    return (
      <Box height="100%">
        <Spinner />
      </Box>
    );

  return (
    <>
      <MenuTitle>
        <Typography fontSize="20px" fontWeight="normal">
          {clauseData.label}
        </Typography>
      </MenuTitle>
      <Box px="20px" pb="20px">
        <ClauseList clauses={(clausesQuery.data as any) ?? []} />
      </Box>
    </>
  );
};

type BannerStatus = "idle" | "success";

export const ClauseFormBanner = ({ status, icon, text }: { text: string; icon: string; status: BannerStatus }) => {
  const bgColor = status === "idle" ? "#E8EDFF" : "#B8FEC9";
  const iconColor = status === "idle" ? "#0063CB" : "#18753C";

  return (
    <Flex bgcolor={bgColor} mb="24px" py="16px" px="32px">
      <Box className={icon} component="i" color={iconColor} />
      <Box dangerouslySetInnerHTML={{ __html: transformBold(text) }} ml="16px" pr="24px" color={iconColor}></Box>
    </Flex>
  );
};

export function transformBold(str: string) {
  return str.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
}

const ClauseList = ({ clauses }: { clauses: ClauseWithIndex[] }) => {
  const groupedByKey = groupBy(clauses, "key");

  return (
    <Stack>
      {Object.entries(groupedByKey).map(([key, clauses], index) => (
        <Fragment key={key}>
          <Stack gap="20px">
            {clauses.map((clause) => (
              <ClauseView key={clause.id} clause={clause} />
            ))}
          </Stack>
          {index < Object.keys(groupedByKey).length - 1 && (
            <Divider height="1px" my={{ xs: "16px", lg: "30px" }} color="#C1C1FB" />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

type ClauseWithIndex = Clause_v2 & { _index: number };

const ClauseView = ({ clause }: { clause: ClauseWithIndex }) => {
  return (
    <Flex flexDirection="column">
      <Box color={fr.colors.decisions.text.actionHigh.blueFrance.default} fontWeight="bold">
        {clause.value}
      </Box>
      {(clause.text || "").split("\\n").map((text, i) => {
        return (
          <Box key={i} whiteSpace="pre-wrap">
            {text}
          </Box>
        );
      })}
    </Flex>
  );
};
