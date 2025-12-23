import { Router } from 'express';
import userRouter from './user';
import vehicleRouter from './vehicle';
import expenseRouter from './expense';

const router = Router();

router.use('/users', userRouter);
router.use('/vehicles', vehicleRouter);
router.use('/expenses', expenseRouter);

export default router;