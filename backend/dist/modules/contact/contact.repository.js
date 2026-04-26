"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const client_1 = require("../../prisma/client");
class ContactRepository {
    async create(data) {
        return client_1.prisma.contactMessage.create({ data });
    }
    async findMany(params) {
        const { skip, take, where } = params;
        const [data, total] = await Promise.all([
            client_1.prisma.contactMessage.findMany({
                skip,
                take,
                where,
                orderBy: { receivedAt: "desc" },
            }),
            client_1.prisma.contactMessage.count({ where }),
        ]);
        return { data, total };
    }
    async findById(id) {
        return client_1.prisma.contactMessage.findUnique({ where: { id } });
    }
    async markAsRead(id) {
        return client_1.prisma.contactMessage.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async delete(id) {
        return client_1.prisma.contactMessage.delete({ where: { id } });
    }
    async updateReplied(id) {
        return client_1.prisma.contactMessage.update({
            where: { id },
            data: { repliedAt: new Date() },
        });
    }
    async countUnread() {
        return client_1.prisma.contactMessage.count({ where: { isRead: false } });
    }
}
exports.ContactRepository = ContactRepository;
//# sourceMappingURL=contact.repository.js.map