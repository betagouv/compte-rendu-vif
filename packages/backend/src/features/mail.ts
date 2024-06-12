import { createTransport } from "nodemailer";
import { ENV } from "../envVars";

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
  reportTitle,
}: {
  recipients: string;
  pdfBuffer: Buffer;
  reportTitle?: string;
}) => {
  return transporter.sendMail({
    from: ENV.EMAIL_EMITTER,
    to: recipients,
    subject: "CR VIF - Compte rendu" + (reportTitle ? ` : ${reportTitle}` : ""),
    text: "Veuillez trouver ci-joint le compte rendu de votre rendez-vous.",
    attachments: [
      {
        filename: "compte_rendu.pdf",
        content: pdfBuffer,
      },
    ],
  });
};

export const sendPasswordResetMail = ({ email, temporaryLink }: { email: string; temporaryLink: string }) => {
  return transporter.sendMail({
    from: ENV.EMAIL_EMITTER,
    to: email,
    subject: "CR VIF - Réinitialisation de mot de passe",
    text: `Voici le lien de réinitialisation de votre mot de passe : ${ENV.FRONTEND_URL}/reset-password/${temporaryLink}`,
  });
};
