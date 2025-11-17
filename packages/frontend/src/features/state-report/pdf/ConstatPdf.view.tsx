import { useQuery } from "@tanstack/react-query";
import { useConstatPdfContext } from "./ConstatPdfContext";
import { getStateReportHtmlString, StateReportPDFDocument, StateReportPDFDocumentProps } from "@cr-vif/pdf/constat";
import { pdf } from "@react-pdf/renderer";
import { Center } from "#components/MUIDsfr.tsx";
import { Spinner } from "#components/Spinner.tsx";
import { PdfCanvas } from "../../../routes/pdf.$reportId";
import { useUser } from "../../../contexts/AuthContext";
import { Box } from "@mui/material";
export const ViewConstatPdf = () => {
  const { localHtmlString } = useConstatPdfContext()!;
  const user = useUser()!;
  console.log(localHtmlString);
  // const htmlString =
  //   stateReport && sections ? getStateReportHtmlString({ stateReport, visitedSections: sections }) : "";

  return (
    <Center>
      <Center width="800px" flexDirection="column">
        <HtmlPdfRenderer
          htmlString={localHtmlString!}
          images={{ marianne: "/marianne.png", marianneFooter: "/marianne_footer.png", fontsPath: "" }}
          service={user.service as any}
        />
      </Center>
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

  console.log(query.error);

  if (query.isLoading)
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );

  return <PdfCanvas blob={query.data as Blob} />;
};

type ImagesAndFontsPath = {
  marianne: string;
  marianneFooter: string;
  fontsPath: string;
};

const HtmlPdfRenderer = (props: StateReportPDFDocumentProps & { images: ImagesAndFontsPath }) => {
  return (
    <Center width="100%">
      <Box width={{ xs: "100%", lg: "800px" }}>
        <HtmlPdf {...props} />
      </Box>
    </Center>
  );
};
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { useRef } from "react";
const HtmlPdf = (props: StateReportPDFDocumentProps & { images: ImagesAndFontsPath }) => {
  const htmlQuery = useQuery({
    queryKey: ["pdf-html"],
    queryFn: async () => {
      const htmlString = renderToStaticMarkup(<HtmlPdfLayout imagesAndFontsPath={props.images} />);
      // how to set an iframe's content to this htmlString using
      ref.current!.srcdoc = htmlString;
      return htmlString;
    },
  });

  const ref = useRef<HTMLIFrameElement>(null);

  return <iframe style={{ width: "100%", height: "90vh" }} ref={ref} />;
};

const HtmlPdfLayout = ({ imagesAndFontsPath }: { imagesAndFontsPath: ImagesAndFontsPath }) => {
  return (
    <html style={{ height: "100%" }}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PDF Test</title>
        <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>

        <style type="text/css">
          {`
      @font-face {
        font-family: "Marianne";
        src: url("${imagesAndFontsPath.fontsPath}/fonts/Marianne-Regular.ttf") format("truetype");
        font-style: normal;
        font-weight: normal;
      }

      @font-face {
        font-family: "Marianne";
        src: url("${imagesAndFontsPath.fontsPath}/fonts/Marianne-Bold.ttf") format("truetype");
        font-style: normal;
        font-weight: bold;
      }

      @font-face {
        font-family: "Marianne";
        src: url("${imagesAndFontsPath.fontsPath}/fonts/Marianne-RegularItalic.ttf") format("truetype");
        font-style: italic;
        font-weight: normal;
      }

      @font-face {
        font-family: "Marianne"; 
        src: url("${imagesAndFontsPath.fontsPath}/fonts/Marianne-BoldItalic.ttf") format("truetype");
        font-style: italic;
        font-weight: bold;
      }

      
      html {
        max-width: 100vw;
        font-family: "Marianne", sans-serif;
        font-size: 12pt;
      }

      
      @page {
        size: A4;
        margin: 20mm;
        background: white;
        border: 1px solid black !important;

        @bottom-right {
          content: "Page " counter(page) " sur " counter(pages);
          font-size: 10pt;
          top: -50px;
          color: #666;
          align-self: flex-start;
        }
      }

      
      .pagedjs_page_content::before {
        content: "''";
        display: block;
        background-image: url("${imagesAndFontsPath.marianne}");
        background-size: contain; /* or cover, or exact dimensions */
        background-repeat: no-repeat;
        left: 20mm;
        max-width: 37px;
        width: 37px;
        height: 16.67px;
        max-height: 16.67px;
      }
            
      .marianne-text {
        text-transform: uppercase;
        line-height: 1.1;
      }


      `}
        </style>
      </head>
      <body style={{ height: "100%" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </body>
    </html>
  );
};
