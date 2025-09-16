import { useState } from "react";
import { db } from "../db/db";
import { Spinner } from "./Spinner";
import noResultsImage from "../assets/noResults.svg";
import { ReportList } from "../features/ReportList";
import { useUser } from "../contexts/AuthContext";
import { useDbQuery } from "../db/db";
import { Box, Stack } from "@mui/material";
import { Center, Input } from "./MUIDsfr";

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
    <Stack width="100%" height="100%">
      <Input
        sx={{ width: "100%", bgcolor: "white !important" }}
        label={null}
        nativeInputProps={{ ...inputProps, value: search, onChange: (e) => setSearch(e.target.value) }}
      />
      <SearchResults search={search} />
    </Stack>
  );
};

const useSearchResultsQuery = (search: string) => {
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
    <Center width="100%">
      <Stack flexDirection={{ base: "column", lg: "row" }} width={{ base: "100%", lg: "unset" }} mt="24px">
        {myReports.length ? (
          <Stack>
            <Box mb="16px" fontSize="20px" fontWeight="bold">
              Mes compte-rendus :
            </Box>
            <ReportList hidePagination hideEmpty={hideEmpty} reports={myReports ?? []} />
          </Stack>
        ) : null}
        <Stack>
          {otherReports.length ? (
            <>
              <Box mb="16px" fontSize="20px" fontWeight="bold">
                Compte-rendus UDAP :
              </Box>
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
    <Center flexDirection="column" height="100%" mt="100px" mb="24px">
      <Box component="span" fontSize="16px" fontWeight="bold">
        Aucun résultat
      </Box>
      <Box component="img" src={noResultsImage} alt="Aucun résultat" />
    </Center>
  );
};
