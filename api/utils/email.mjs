import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const FRONTEND_SERVER = process.env.FRONTEND_SERVER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

// contains details for sender email
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "mapscodes01@gmail.com",
    pass: SMTP_PASSWORD,
  },
});

// sends an email notifying that a new review has been submitted
export async function sendVerificationCode(name, message) {
  await transporter.sendMail({
    from: "mapscodes01@gmail.com",
    to: "regina.kapoko@cs.unza.zm",
    subject: "Portfolio Review",
    html: `<p>${name} just submitted a review on your porfolio website, below is the content;</p>
            <p>${message}</p>
            <a href="${FRONTEND_SERVER}/index.html" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
              View Portfolio
            </a>
            <br>
            <p>If the button is not working use the link below:</p>
            <a href="${FRONTEND_SERVER}/index.html">
                ${FRONTEND_SERVER}/index.html
            </a>`,
  });
}
