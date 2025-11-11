import { useContext, createContext } from "react";
import { StateReport, StateReportAttachment, VisitedSection, VisitedSectionAttachment } from "../../../db/AppSchema";
import { StateReportWithUser } from "../../report/ReportList";

type ConstatPdfContextType = {
  stateReport?: StateReportWithUserAndAttachments | null;
  sections?: SectionWithAttachments[];
  isLoading: boolean;
  localHtmlString: string | null;
  setLocalHtmlString: (htmlString: string) => void;
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
  sections: undefined,
  localHtmlString: null,
  setLocalHtmlString: () => {},
});
export const useConstatPdfContext = () => useContext(ConstatPdfContext);
