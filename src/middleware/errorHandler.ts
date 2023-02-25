import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(err);
        res.status(400).send({
            message: err.message
        });
    } catch (error) {
        next(error);
    }
}