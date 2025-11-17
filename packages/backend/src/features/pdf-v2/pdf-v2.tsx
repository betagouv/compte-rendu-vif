import { Selectable } from "kysely";
import { Database } from "../../db/db";
import puppeteer, { Browser } from "puppeteer";
import ReactDOMServer from "react-dom/server";

const browserRef = { browser: null as Browser | null };
const getBrowser = async () => {
  if (!browserRef.browser) {
    browserRef.browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: false,
    });
  }
  return browserRef.browser;
};

export const generateStateReportPdfV2 = async (stateReport: Selectable<Database["state_report"]>) => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  const html = ReactDOMServer.renderToStaticMarkup(<TestComponent />);
  await page.setContent(html, { waitUntil: "networkidle0" });
  // const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  // await page.close();
  // return pdfBuffer;
};

const TestComponent = () => {
  return (
    <>
      <p className="meeting-date">aa</p>
    </>
  );
};
