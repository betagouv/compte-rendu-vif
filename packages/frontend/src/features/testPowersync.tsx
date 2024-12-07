import { useQuery, useStatus } from "@powersync/react";

export const TestPowersync = () => {
  return null;
  const a = useQuery("SELECT * FROM report");
  const status = useStatus();
  console.log(status.connected);
  console.log(a);
  return <div>{(a.data || []).map((r) => r.id).join(", ")}</div>;
};
