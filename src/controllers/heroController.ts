import { Request, Response } from 'express';
import Hero from '../models/Hero';

export const getHeroes = async (req: Request, res: Response): Promise<void> => {
    try {
        const heroes = await Hero.find().sort({ createdAt: -1 });
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', err });
    }
};

export const getHeroById = async (req: Request, res: Response): Promise<void> => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) { res.status(404).json({ message: 'Héros non trouvé' }); return; }
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', err });
    }
};

export const createHero = async (req: Request, res: Response): Promise<void> => {
    try {
        const hero = new Hero(req.body);
        await hero.save();
        res.status(201).json(hero);
    } catch (err) {
        res.status(400).json({ message: 'Erreur création', err });
    }
};

export const updateHero = async (req: Request, res: Response): Promise<void> => {
    try {
        const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hero) { res.status(404).json({ message: 'Héros non trouvé' }); return; }
        res.json(hero);
    } catch (err) {
        res.status(400).json({ message: 'Erreur mise à jour', err });
    }
};

export const deleteHero = async (req: Request, res: Response): Promise<void> => {
    try {
        const hero = await Hero.findByIdAndDelete(req.params.id);
        if (!hero) { res.status(404).json({ message: 'Héros non trouvé' }); return; }
        res.json({ message: 'Héros supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur suppression', err });
    }
};