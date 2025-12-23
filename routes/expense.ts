import { Router } from 'express';
import * as expenseController from '../controllers/expense';

const router = Router();

router.get('/', expenseController.listExpenses);
router.post('/', expenseController.createExpense);

export default router;