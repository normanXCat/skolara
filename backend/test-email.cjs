const nodemailer = require("nodemailer");
require("dotenv").config();

const fromEmail = (process.env.EMAIL_FROM || "").replace(/^["'](.+)["']$/, "$1").trim();
const emailPassword = (process.env.EMAIL_PASSWORD || "").replace(/^["'](.+)["']$/, "$1").trim();

console.log(`FROM: "${fromEmail}"`);
console.log(`PASS length: ${emailPassword.length} chars`);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: fromEmail,
        pass: emailPassword,
    },
});

console.log("Verifying SMTP connection...");
transporter.verify(function(err, success) {
    if (err) {
        console.error("❌ Verify failed:", err.message);
        process.exit(1);
    }
    console.log("✅ SMTP connection OK");
    
    console.log("Sending test email...");
    transporter.sendMail({
        from: fromEmail,
        to: "outredlinux@gmail.com",
        subject: "Test Skolara " + Date.now(),
        text: "Test email - si vous le lisez, ca marche !",
    }, function(err, info) {
        if (err) {
            console.error("❌ Send failed:", err.message);
            process.exit(1);
        }
        console.log("✅ Sent! MessageId:", info.messageId);
        console.log("Response:", info.response);
        console.log("Accepted:", info.accepted);
        console.log("Rejected:", info.rejected);
        process.exit(0);
    });
});
