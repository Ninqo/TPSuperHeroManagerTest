import express from 'express';
import * as controller from '../controllers/heroController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/', controller.getHeroes);
router.get('/:id', controller.getHeroById);
router.post('/', authMiddleware, requireRole('admin'), controller.createHero);
router.put('/:id', authMiddleware, requireRole('admin'), controller.updateHero);
router.delete('/:id', authMiddleware, requireRole('admin'), controller.deleteHero);

export default router;