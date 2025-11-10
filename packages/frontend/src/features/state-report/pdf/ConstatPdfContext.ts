import { useContext, createContext } from "react";
import { StateReport, StateReportAttachment, VisitedSection, VisitedSectionAttachment } from "../../../db/AppSchema";
import { StateReportWithUser } from "../../report/ReportList";

type ConstatPdfContextType = {
  stateReport?: StateReportWithUserAndAttachments | null;
  sections?: SectionWithAttachments[];
  isLoading: boolean;
};

export type SectionWithAttachments = VisitedSection & {
  attachments: (VisitedSectionAttachment & { file: string })[];
};

export type StateReportWithUserAndAttachments = StateReportWithUser & {
  attachments: (StateReportAttachment & { file: string })[];
};

export const ConstatPdfContext = createContext<ConstatPdfContextType | undefined>({
  isLoading: false,
  stateReport: undefined,
});
export const useConstatPdfContext = () => useContext(ConstatPdfContext);
