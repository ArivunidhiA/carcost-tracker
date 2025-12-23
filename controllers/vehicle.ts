import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';

export const listVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { make, model, year, userId } = req.body;
    const vehicle = await prisma.vehicle.create({ data: { make, model, year: Number(year), userId } });
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};