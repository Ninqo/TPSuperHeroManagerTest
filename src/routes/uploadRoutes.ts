import express from 'express';
import multer from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/', multer.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Pas de fichier' });
    res.json({ path: `/uploads/${req.file.filename}` });
});

export default router;