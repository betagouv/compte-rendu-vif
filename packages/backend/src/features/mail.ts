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

export const sendReportMail = () => {
  transporter.sendMail({
    from: "noreply@compte-rendu-vif.incubateur.net",
    to: "mledoux@mledoux.fr",
    subject: "Salut c'est moi",
    text: "Salut lmkdjmklfjlkm q",
  });
};

export const sendPasswordResetMail = ({ email, temporaryLink }: { email: string; temporaryLink: string }) => {
  return transporter.sendMail({
    from: "noreply@compte-rendu-vif.incubateur.net",
    to: email,
    subject: "CR VIF - Réinitialisation de mot de passe",
    text: `Voici le lien de réinitialisation de votre mot de passe : ${ENV.FRONTEND_URL}/reset-password/${temporaryLink}`,
  });
};
