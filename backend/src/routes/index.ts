import { Router } from 'express';
import expenseRoutes from './expenses';
import userRoutes from './users';

const router = Router();

router.use('/api/expenses', expenseRoutes);
router.use('/api/users', userRoutes);

export default router;
