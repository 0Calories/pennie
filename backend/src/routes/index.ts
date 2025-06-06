import { Router } from 'express';
import expenseRoutes from './expenses';

const router = Router();

router.use('/api/expenses', expenseRoutes);

export default router;
