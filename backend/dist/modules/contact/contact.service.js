"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const send_1 = require("../../lib/email/send");
const base_1 = require("../../lib/email/templates/base");
class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async submitForm(data) {
        const message = await this.contactRepository.create(data);
        const toEmail = (process.env.EMAIL_FROM || 'admin@skolara.pf').replace(/^["'](.+)["']$/, '$1').trim();
        // Send notification to admin
        await (0, send_1.sendEmail)({
            to: toEmail,
            subject: `[Skolara Contact] ${data.subject} — from ${data.fullName}`,
            html: (0, base_1.getBaseTemplate)({
                title: "Nouveau message de contact",
                content: `
          <h2>Nouveau message de contact</h2>
          <p><strong>De :</strong> ${data.fullName} (${data.email})</p>
          <p><strong>Sujet :</strong> ${data.subject}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        `,
            }),
            replyTo: data.email,
        });
        return message;
    }
    async findAll(filters) {
        const { page = 1, limit = 20 } = filters;
        return this.contactRepository.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findById(id) {
        return this.contactRepository.findById(id);
    }
    async markAsRead(id) {
        return this.contactRepository.markAsRead(id);
    }
    async delete(id) {
        return this.contactRepository.delete(id);
    }
    async reply(id, replyMessage) {
        const original = await this.contactRepository.findById(id);
        if (!original)
            throw new Error("Message non trouvé");
        await (0, send_1.sendEmail)({
            to: original.email,
            subject: `Re: ${original.subject}`,
            html: (0, base_1.getBaseTemplate)({
                title: `Re: ${original.subject}`,
                content: `
          <div style="margin-bottom: 20px;">
            ${replyMessage.replace(/\n/g, "<br>")}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <div style="color: #666; font-size: 0.9em;">
            <p><strong>Message original le ${original.receivedAt.toLocaleDateString()} :</strong></p>
            <blockquote style="border-left: 3px solid #ddd; padding-left: 15px; margin-left: 0;">
              ${original.message.replace(/\n/g, "<br>")}
            </blockquote>
          </div>
        `,
            }),
        });
        return this.contactRepository.updateReplied(id);
    }
    async getUnreadCount() {
        return this.contactRepository.countUnread();
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map