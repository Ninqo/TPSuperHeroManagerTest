import express from 'express';
import * as controller from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/', authMiddleware, requireRole('admin'), controller.getUsers);

export default router;