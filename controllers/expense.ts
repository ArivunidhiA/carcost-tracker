import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';

export const listExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId, amount, category, note, date } = req.body;
    const expense = await prisma.expense.create({ data: { vehicleId, amount: Number(amount), category, note, date: date ? new Date(date) : undefined } });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};