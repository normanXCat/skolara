import "dotenv/config";
import nodemailer from "nodemailer";

const fromEmail = (process.env.EMAIL_FROM || "").replace(/^["'](.+)["']$/, "$1").trim();
const emailPassword = (process.env.EMAIL_PASSWORD || "").replace(/^["'](.+)["']$/, "$1").trim();

console.log(`FROM: "${fromEmail}"`);
console.log(`PASS: "${emailPassword}" (${emailPassword.length} chars)`);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: fromEmail,
        pass: emailPassword,
    },
});

console.log("Verifying...");
transporter.verify()
    .then(() => {
        console.log("✅ SMTP OK");
        return transporter.sendMail({
            from: fromEmail,
            to: "outredlinux@gmail.com",
            subject: "Test Skolara " + Date.now(),
            text: "Test email - si vous le lisez, ca marche !",
        });
    })
    .then((info) => {
        console.log("✅ Sent!", info.messageId, info.response);
        console.log("Accepted:", info.accepted);
        console.log("Rejected:", info.rejected);
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Error:", err.message);
        process.exit(1);
    });
