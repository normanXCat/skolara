"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_schema_1 = require("./contact.schema");
class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async submitForm(req, res, next) {
        try {
            const validatedData = contact_schema_1.contactFormSchema.parse(req.body);
            await this.contactService.submitForm(validatedData);
            res.json({ success: true, message: "Votre message a été envoyé avec succès." });
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const filters = contact_schema_1.contactFiltersSchema.parse(req.query);
            const result = await this.contactService.findAll(filters);
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const message = await this.contactService.findById(id);
            if (!message) {
                return res.status(404).json({ success: false, error: "Message non trouvé" });
            }
            res.json({ success: true, data: message });
        }
        catch (error) {
            next(error);
        }
    }
    async markAsRead(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const message = await this.contactService.markAsRead(id);
            res.json({ success: true, data: message });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await this.contactService.delete(id);
            res.json({ success: true, message: "Message supprimé" });
        }
        catch (error) {
            next(error);
        }
    }
    async reply(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ success: false, error: "Le message de réponse est requis" });
            }
            await this.contactService.reply(id, message);
            res.json({ success: true, message: "Réponse envoyée" });
        }
        catch (error) {
            next(error);
        }
    }
    async getUnreadCount(req, res, next) {
        try {
            const count = await this.contactService.getUnreadCount();
            res.json({ success: true, data: { count } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map