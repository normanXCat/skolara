import { Request, Response, NextFunction } from "express";
export declare class UploadController {
    /**
     * Gère l'upload d'un fichier unique.
     */
    static uploadSingle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Gère l'upload de plusieurs fichiers.
     */
    static uploadMultiple(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=upload.controller.d.ts.map