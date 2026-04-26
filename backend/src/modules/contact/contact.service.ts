import { ContactRepository } from "./contact.repository";
import { ContactFormInput, ContactFilters } from "./contact.schema";
import { sendEmail } from "../../lib/email/send";
import { getBaseTemplate } from "../../lib/email/templates/base";

export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  async submitForm(data: ContactFormInput) {
    const message = await this.contactRepository.create(data);

    // Send notification to admin
    await sendEmail({
      to: "normanvonizara@gmail.com",
      subject: `[Skolara Contact] ${data.subject} — from ${data.fullName}`,
      html: getBaseTemplate({
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

  async findAll(filters: ContactFilters) {
    const { page = 1, limit = 20 } = filters;
    return this.contactRepository.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: number) {
    return this.contactRepository.findById(id);
  }

  async markAsRead(id: number) {
    return this.contactRepository.markAsRead(id);
  }

  async delete(id: number) {
    return this.contactRepository.delete(id);
  }

  async reply(id: number, replyMessage: string) {
    const original = await this.contactRepository.findById(id);
    if (!original) throw new Error("Message non trouvé");

    await sendEmail({
      to: original.email,
      subject: `Re: ${original.subject}`,
      html: getBaseTemplate({
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
