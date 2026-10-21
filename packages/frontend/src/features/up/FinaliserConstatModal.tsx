import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "../../contexts/AuthContext";
import type { StateReport } from "../../db/AppSchema";
import { UpSelectionModal } from "./UpSelectionModal";
import { flushStateReportForm } from "../state-report/utils";
import { createNextRapportConstat, getRapportUpIds, useRapportMembers } from "./rapportGroupe";
import { getUpRoot, type UpTree } from "./upApi";
import { hasUpLeftForRapport } from "./rapportGroupe.utils";

/**
 * « Finaliser le constat » of a MH complexe: offers to start the constat of another UP of the same monument,
 * which will be sent with this one in the same document (rapport groupé), or to go on to the PDF.
 */
export const FinaliserConstatModal = ({
  stateReport,
  tree,
  onSkip,
  onClose,
  onRapportId,
}: {
  stateReport: StateReport;
  tree: UpTree;
  /** « Passer et finaliser »: go on to the PDF of the rapport */
  onSkip: () => void;
  onClose: () => void;
  /** the current constat joined a rapport: its form must hold the rapport_id too, or its autosave would erase it */
  onRapportId: (rapportId: string) => void;
}) => {
  const { service: _service, ...user } = useUser()!;
  const navigate = useNavigate();
  const members = useRapportMembers(stateReport.rapport_id);
  const excludedUpIds = getRapportUpIds([...members, stateReport]);

  const createMutation = useMutation({
    mutationFn: async (selection: Parameters<typeof createNextRapportConstat>[0]["selection"]) => {
      await flushStateReportForm(stateReport).catch(console.error);
      return createNextRapportConstat({ current: stateReport, selection, user: user as any });
    },
    onSuccess: ({ id, rapportId }) => {
      onRapportId(rapportId);
      onClose();
      navigate({
        to: "/constat/$constatId",
        params: { constatId: id },
        search: { step: "contexte-visite", mode: "view" },
      });
      window.scrollTo({ top: 0 });
    },
    onError: (e) => console.error(e),
  });

  const monumentTitle = stateReport.titre_edifice ?? getUpRoot(tree).intitule;

  return (
    <UpSelectionModal
      open
      title="Finaliser le constat"
      confirmLabel="Commencer un nouveau constat"
      showIntro={false}
      monumentTitle={monumentTitle}
      tree={tree}
      excludedUpIds={excludedUpIds}
      question={
        <>
          Souhaitez-vous réaliser un constat d’état pour une autre UP du monument <b>{monumentTitle}</b> ?
          <br />
          Vos observations seront réunies au sein d’un même document.
        </>
      }
      secondaryAction={{ label: "Passer et finaliser", onClick: onSkip }}
      onCancel={onClose}
      onConfirm={(selection) => {
        if (createMutation.isPending) return;
        createMutation.mutate(selection);
      }}
    />
  );
};
