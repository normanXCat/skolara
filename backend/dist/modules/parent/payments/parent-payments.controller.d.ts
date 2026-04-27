import { Request, Response, NextFunction } from "express";
declare class ParentPaymentsController {
    getChildPayments(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: ParentPaymentsController;
export default _default;
//# sourceMappingURL=parent-payments.controller.d.ts.map