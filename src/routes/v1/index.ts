import authRoutes from './auth-routes';
import cvRoutes from './cv-routes';

import { Router } from 'express';

const router = Router();

router.use('/info', (req, res) => {
    res.json({ message: 'API is running' });
});

router.use('/user', authRoutes);
router.use('/cv', cvRoutes);

export default router;  