import { useContext, createContext } from "react";
import { StateReport, VisitedSection, VisitedSectionAttachment } from "../../../db/AppSchema";
import { StateReportWithUser } from "../../report/ReportList";

type ConstatPdfContextType = {
  stateReport?: StateReportWithUser;
  sections?: SectionWithAttachments[];
  isLoading: boolean;
};

export type SectionWithAttachments = VisitedSection & {
  attachments: (VisitedSectionAttachment & { file: string })[];
};

export const ConstatPdfContext = createContext<ConstatPdfContextType | undefined>({
  isLoading: false,
  stateReport: undefined,
});
export const useConstatPdfContext = () => useContext(ConstatPdfContext);
