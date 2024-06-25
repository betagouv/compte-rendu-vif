import { createTransport } from "nodemailer";
import { ENV } from "../envVars";
import { Report } from "@cr-vif/electric-client/frontend";
import { format } from "date-fns";

const transporter = createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});

export const sendReportMail = ({
  recipients,
  pdfBuffer,
  report,
}: {
  recipients: string;
  pdfBuffer: Buffer;
  report: Report;
}) => {
  return transporter.sendMail({
    from: ENV.EMAIL_EMITTER,
    to: recipients,
    subject: "Compte-rendu UDAP : " + (report?.title ? ` : ${report.title}` : ""),
    text: `Bonjour,
vous trouverez ci-joint le compte-rendu de notre rendez-vous.

Ce compte-rendu est un nouveau dispositif en phase de développement pour but d’aider l’usager
dans sa démarche. Aidez-nous à l’améliorer en répondant à ce questionnaire anonyme de moins d’une minute : https://adtk8x51mbw.eu.typeform.com/to/LHrKhXkd

Cordialement`,
    attachments: [
      {
        filename: getPDFInMailName(report),
        content: pdfBuffer,
      },
    ],
  });
};

const getPDFInMailName = (report: Report) => {
  const date = format(report.meetDate || new Date(), "dd-MM-yyyy");
  return `compte_rendu_UDAP_${[report.applicantName?.replaceAll(" ", ""), date].filter(Boolean).join("_")}.pdf`;
};

export const sendPasswordResetMail = ({ email, temporaryLink }: { email: string; temporaryLink: string }) => {
  return transporter.sendMail({
    from: ENV.EMAIL_EMITTER,
    to: email,
    subject: "CR VIF - Réinitialisation de mot de passe",
    text: `Voici le lien de réinitialisation de votre mot de passe : ${ENV.FRONTEND_URL}/reset-password/${temporaryLink}`,
  });
};
