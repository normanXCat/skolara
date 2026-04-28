import { Request, Response, NextFunction } from "express";
export declare class ReportCardsController {
    downloadPdf(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByClass(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPreview(req: Request, res: Response, next: NextFunction): Promise<void>;
    finalize(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateForClass(req: Request, res: Response, next: NextFunction): Promise<void>;
    exportBatch(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: ReportCardsController;
export default _default;
//# sourceMappingURL=report-cards.controller.d.ts.map