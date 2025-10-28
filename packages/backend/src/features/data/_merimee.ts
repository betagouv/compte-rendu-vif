import { ofetch } from "ofetch";
import { ENV } from "../../envVars";
import { db } from "../../db/db";
import { makeDebug } from "../debug";
import { chunk } from "pastable";

const debug = makeDebug("sync-pop");

export const fetchMerimee = async () => {
  const saveMerimeeRows = async (rows: MerimeeResult["rows"]) => {
    const chunked = chunk(rows, 50);
    for (const ch of chunked) {
      await db.insertInto("merimee").values(ch).execute();
    }
  };

  debug("Fetching Merimee data...");

  let currentPage = await fetchPage({ table: "merimee", size: 1000, next: null });
  await saveMerimeeRows(currentPage.rows);
  await sleep(2000);

  while (currentPage.next) {
    debug(`Fetching Merimee next page: ${currentPage.next}/${currentPage.filtered_table_rows_count}`);
    const nextToken = parseInt(currentPage.next, 10);
    currentPage = await fetchPage({ table: "merimee", size: 1000, next: nextToken });
    await saveMerimeeRows(currentPage.rows);
    await sleep(2000);
  }

  debug("Finished fetching Merimee data.");
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPage = async <T extends "merimee" | "merimee_to_memoire">({
  table,
  size,
  next,
}: {
  table: T;
  size: number;
  next: number | null;
}) => {
  type Result = T extends "merimee" ? MerimeeResult : MerimeeToMemoireResult;

  const result = await ofetch<Result>(`${ENV.COLLECTIF_OBJETS_DATASETTE_URL}/data/${table}.json`, {
    params: {
      _size: size,
      _next: next || undefined,
      _shape: "objects",
    },
  });

  return result;
};

type PopData = any;

export interface MerimeeResult {
  database: string;
  table: string;
  is_view: boolean;
  human_description_en: string;
  rows: any[];
  truncated: boolean;
  filtered_table_rows_count: number;
  expanded_columns: any[];
  expandable_columns: any[];
  columns: string[];
  primary_keys: any[];
  units: any;
  query: Query;
  facet_results: any;
  suggested_facets: any[];
  next: string;
  next_url: string;
  private: boolean;
  allow_execute_sql: boolean;
  query_ms: number;
}

export interface MerimeeToMemoireResult {
  database: string;
  table: string;
  is_view: boolean;
  human_description_en: string;
  rows: any[];
  truncated: boolean;
  filtered_table_rows_count: number;
  expanded_columns: any[];
  expandable_columns: any[];
  columns: string[];
  primary_keys: any[];
  units: any;
  query: Query;
  facet_results: any;
  suggested_facets: any[];
  next: string;
  next_url: string;
  private: boolean;
  allow_execute_sql: boolean;
  query_ms: number;
}

export interface Query {
  sql: string;
  params: any;
}
