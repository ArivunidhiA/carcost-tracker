import { Router } from 'express';
import * as userController from '../controllers/user';

const router = Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);

export default router;