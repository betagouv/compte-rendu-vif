import { createTransport } from "nodemailer";
import { ENV } from "../envVars";

const transporter = createTransport({
  host: "smtp.ionos.fr",
  port: 465,
  auth: {
    type: "OAUTH2",
    user: "tinmardoule@gmail.com",
    clientId: ENV.EMAIL_CLIENT_ID,
    clientSecret: ENV.EMAIL_CLIENT_SECRET,
  },
});

export const sendMail = () => {
  transporter.sendMail({
    from: "salut@salut",
    to: "mledoux@mledoux.fr",
    subject: "Salut",
    text: "Salut",
  });
};
