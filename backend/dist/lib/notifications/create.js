"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
const client_1 = require("../../prisma/client");
async function createNotification({ userId, type, content, }) {
    await client_1.prisma.notification.create({
        data: {
            userId,
            type,
            content,
        },
    });
}
//# sourceMappingURL=create.js.map