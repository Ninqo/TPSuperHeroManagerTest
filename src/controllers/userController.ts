import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-passwordHash');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', err });
    }
};