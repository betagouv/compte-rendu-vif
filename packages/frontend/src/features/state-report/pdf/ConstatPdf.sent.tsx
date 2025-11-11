import { useMutation, useQuery } from "@tanstack/react-query";
import { useConstatPdfContext } from "./ConstatPdfContext";
import { getStateReportHtmlString, StateReportPDFDocument, StateReportPDFDocumentProps } from "@cr-vif/pdf/constat";
import { pdf } from "@react-pdf/renderer";
import { Button, Center } from "#components/MUIDsfr.tsx";
import { Spinner } from "#components/Spinner.tsx";
import { PdfCanvas } from "../../../routes/pdf.$reportId";
import { useUser } from "../../../contexts/AuthContext";
import { api } from "../../../api";
import { useEffect, useRef } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Flex } from "#components/ui/Flex.tsx";
import { Box } from "@mui/material";
import sentImage from "../../../assets/sent.svg";

const routeApi = getRouteApi("/constat_/$constatId/pdf");

export const SentConstatPdf = () => {
  const { localHtmlString, recipients } = useConstatPdfContext()!;

  const navigate = routeApi.useNavigate();

  const { constatId } = routeApi.useParams();
  const savePdfMutation = useMutation({
    mutationFn: async () => {
      return api.post("/api/pdf/state-report", {
        body: {
          stateReportId: constatId,
          htmlString: localHtmlString!,
          recipients: recipients.join(","),
        },
      });
    },
  });

  const hasSentRef = useRef(false);

  useEffect(() => {
    if (hasSentRef.current) return;
    if (!localHtmlString) return;
    savePdfMutation.mutate();
    hasSentRef.current = true;
  }, [localHtmlString, recipients]);

  console.log(savePdfMutation);

  return (
    <Center height="100%">
      {savePdfMutation.isPending ? <Spinner /> : null}
      {savePdfMutation.isError ? (
        <Center flexDirection="column" gap="16px">
          <div>Erreur: {(savePdfMutation.error as Error).message}</div>{" "}
          <Button onClick={() => savePdfMutation.mutate()}>Réessayer</Button>
        </Center>
      ) : null}
      {savePdfMutation.isSuccess ? (
        <Center flexDirection="column" width="100%" mt="24px">
          <Box component="img" src={sentImage} alt="Courriel envoyé" width={{ xs: "80px", lg: "120px" }} />
          <Box mt="16px" color="text-title-blue-france" textAlign="center" fontSize={{ xs: "18px", lg: "24px" }}>
            Votre constat d'état a bien été envoyé !
          </Box>
          <Button
            sx={{ mt: { xs: "24px", lg: "48px" } }}
            type="button"
            onClick={() => navigate({ to: "/", search: { document: "constats" } })}
          >
            Accueil
          </Button>
        </Center>
      ) : null}
    </Center>
  );
};

const View = (props: StateReportPDFDocumentProps) => {
  const query = useQuery({
    queryKey: ["report-pdf", props.htmlString],
    queryFn: async () => {
      const blob = await pdf(<StateReportPDFDocument {...props} />).toBlob();
      return blob;
    },
    refetchOnWindowFocus: false,
    enabled: !!props.htmlString,
  });

  if (query.isLoading)
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );

  return <PdfCanvas blob={query.data as Blob} />;
};
