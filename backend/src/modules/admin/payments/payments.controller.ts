import { Request, Response, NextFunction } from "express";
import { PaymentsService } from "./payments.service";

const paymentsService = new PaymentsService();

export class PaymentsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;
      const status = req.query.status as string | undefined;

      const result = await paymentsService.getAll(page, limit, search, status);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await paymentsService.getStats();

      res.status(200).json({
         success: true,
         data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const { amountPaid, reference, paymentMethod } = req.body;

      const updated = await paymentsService.updatePayment(id, amountPaid, reference, paymentMethod);

      res.status(200).json({
         success: true,
         data: updated,
         message: "Payment successfully updated"
      });
    } catch (error) {
      next(error);
    }
  }
}
