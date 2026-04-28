import { Request, Response, NextFunction } from "express";
declare class StudentPaymentsController {
    getMyPayments: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: StudentPaymentsController;
export default _default;
//# sourceMappingURL=student-payments.controller.d.ts.map