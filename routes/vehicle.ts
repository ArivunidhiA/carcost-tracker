import { Router } from 'express';
import * as vehicleController from '../controllers/vehicle';

const router = Router();

router.get('/', vehicleController.listVehicles);
router.post('/', vehicleController.createVehicle);

export default router;