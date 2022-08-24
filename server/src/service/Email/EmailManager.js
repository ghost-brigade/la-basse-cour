import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
import {env} from "../../../config.js";

export const sendEmail = async (email, subject, html, text) => {
    if (!text) {
        text = html;
    }

    const transporter = createTransport(env.mailer);

    const info = await transporter.sendMail({
        from: "Sender Name",
        to: email,
        subject: subject,
        text: text,
        html: html,
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
}