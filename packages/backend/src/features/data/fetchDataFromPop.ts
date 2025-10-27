import { ofetch } from "ofetch";
import { ENV } from "../../envVars";

export const fetchDataFromPop = async (): Promise<PopData> => {
  const data = ofetch(ENV.POP_URL);
  return data;
};

type PopData = any;
