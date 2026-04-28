"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const payments_service_1 = require("./payments.service");
const paymentsService = new payments_service_1.PaymentsService();
class PaymentsController {
    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;
            const status = req.query.status;
            const result = await paymentsService.getAll(page, limit, search, status);
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getStats(req, res, next) {
        try {
            const stats = await paymentsService.getStats();
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updatePayment(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { amountPaid, reference, paymentMethod } = req.body;
            const updated = await paymentsService.updatePayment(id, amountPaid, reference, paymentMethod);
            res.status(200).json({
                success: true,
                data: updated,
                message: "Payment successfully updated"
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map