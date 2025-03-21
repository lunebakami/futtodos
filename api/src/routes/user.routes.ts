import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { auth } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/login', userController.login);

// Protected routes
router.post('/', auth, userController.createUser);
router.get('/', auth, userController.getUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

export default router; 