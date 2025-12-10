import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: { role: string };
}

export const requireRole = (role: 'admin' | 'editor') => {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        if (req.user?.role !== role) return next(new Error('Accès interdit'));
        next();
    };
};