import { TriplitClient } from "@triplit/client";
import { schema } from "../../backend/triplit/schema";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ3OWE1YjU3LTBmNTEtNDhkNS1iMGZmLTk0YmRiOGU0NTlkNCIsIngtdHJpcGxpdC11c2VyLWlkIjoiZDc5YTViNTctMGY1MS00OGQ1LWIwZmYtOTRiZGI4ZTQ1OWQ0IiwieC10cmlwbGl0LXByb2plY3QtaWQiOiJjcnZpZiIsIngtdHJpcGxpdC10b2tlbi10eXBlIjoiZXh0ZXJuYWwiLCJpYXQiOjE3MTE1MzA4ODQsImV4cCI6MTcxMjEzNTY4NH0.hbOxcbL60CLoworrkdX4emra4HzB9zdG_nqkYLrbGyw";

export const db = new TriplitClient({
  serverUrl: "http://localhost:3000",
  token: mockToken,
  schema: schema,
  storage: "indexeddb",
});
