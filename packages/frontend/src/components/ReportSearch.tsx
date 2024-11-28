import { Center, Stack, styled } from "#styled-system/jsx";
import { css, cx } from "#styled-system/css";
import Input from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import { db } from "../db/db";
import { Spinner } from "./Spinner";
import noResultsImage from "../assets/noResults.svg";
import { ReportList } from "../features/ReportList";
import { useUser } from "../contexts/AuthContext";
import { useDbQuery } from "../db/db";

export const ReportSearch = ({
  inputProps,
}: {
  inputProps: {
    id: string;
    type: string;
    className: string;
    placeholder: string;
  };
}) => {
  const [search, setSearch] = useState("");

  return (
    <Stack w="100%" h="100%">
      <Input
        className={css({ w: "100%", bgColor: "white !important" })}
        label={null}
        nativeInputProps={{ ...inputProps, value: search, onChange: (e) => setSearch(e.target.value) }}
      />
      <SearchResults search={search} />
    </Stack>
  );
};

const isNullOrContains = (field: string, search: string) => {
  return {
    [field]: { contains: search },
  };
};

const useSearchResultsQuery = (search: string, additionnalWhere: { [key: string]: any } = {}) => {
  return useDbQuery(
    db
      .selectFrom("report")
      .where((eb) =>
        eb.or([
          eb("title", "like", `%${search}%`),
          eb("redactedBy", "like", `%${search}%`),
          eb("applicantName", "like", `%${search}%`),
          eb("applicantAddress", "like", `%${search}%`),
          eb("city", "like", `%${search}%`),
          eb("zipCode", "like", `%${search}%`),
        ]),
      )
      .leftJoin("user", "user.id", "report.createdBy")
      .selectAll(["report"])
      .orderBy("createdAt desc")
      .select(["user.name as createdByName"]),
  );
  // return useLiveQuery(
  //   db.report.liveMany({
  //     where: {
  //       OR: [
  //         isNullOrContains("title", search),
  //         isNullOrContains("redactedBy", search),
  //         isNullOrContains("applicantName", search),
  //         isNullOrContains("applicantAddress", search),
  //         isNullOrContains("city", search),
  //         isNullOrContains("zipCode", search),
  //       ],
  //       disabled: false,
  //       ...additionnalWhere,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   }),
  // );
};

export const SearchResults = ({ search, hideEmpty }: { search: string; hideEmpty?: boolean }) => {
  const query = useSearchResultsQuery(search);
  const user = useUser()!;
  const isEmpty = search === "";

  if (isEmpty) {
    return null;
  }

  if (query.isLoading) {
    return (
      <Center mt="100px">
        <Spinner />
      </Center>
    );
  }

  const { data } = query;
  const noResults = !data || data.length === 0;

  if (noResults) {
    return <NoResults />;
  }

  const myReports = data.filter((report) => report.createdBy === user.id);
  const otherReports = data.filter((report) => report.createdBy !== user.id);

  return (
    <Center w="100%">
      <Stack flexDir={{ base: "column", lg: "row" }} w={{ base: "100%", lg: "unset" }} mt="24px">
        {myReports.length ? (
          <Stack>
            <styled.div mb="16px" fontSize="20px" fontWeight="bold">
              Mes compte-rendus :
            </styled.div>
            <ReportList hidePagination hideEmpty={hideEmpty} reports={myReports ?? []} />
          </Stack>
        ) : null}
        <Stack>
          {otherReports.length ? (
            <>
              <styled.div mb="16px" fontSize="20px" fontWeight="bold">
                Compte-rendus UDAP :
              </styled.div>
              <ReportList hidePagination hideEmpty={hideEmpty} reports={otherReports ?? []} />
            </>
          ) : null}
        </Stack>
      </Stack>
    </Center>
  );
};

const NoResults = () => {
  return (
    <Center flexDir="column" h="100%" mt="100px" mb="24px">
      <styled.span fontSize="16px" fontWeight="bold">
        Aucun résultat
      </styled.span>
      <styled.img src={noResultsImage} alt="Aucun résultat" />
    </Center>
  );
};
