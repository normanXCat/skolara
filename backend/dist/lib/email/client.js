"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();
/**
 * Configuraton du transporteur Nodemailer.
 * Utilise Gmail ou un autre service SMTP selon la configuration.
 */
exports.transporter = nodemailer_1.default.createTransport({
    // @ts-ignore - Some transporter options might not perfectly match types but work
    service: 'gmail',
    auth: {
        user: fromEmail,
        pass: emailPassword
    }
});
//# sourceMappingURL=client.js.map