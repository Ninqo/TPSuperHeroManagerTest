import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, role } = req.body;
        const existing = await User.findOne({ username });
        if (existing) { res.status(409).json({ message: 'Nom d’utilisateur déjà pris' }); return; }
        const user = new User({ username, passwordHash: password, role });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur inscription', err });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: 'Identifiants invalides' }); return;
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', err });
    }
};