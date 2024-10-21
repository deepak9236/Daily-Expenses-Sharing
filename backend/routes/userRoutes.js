import express from 'express';
import { createUser, getUserDetails } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 


const router = express.Router();

router.post('/', createUser);
router.get('/:id', authMiddleware,getUserDetails);


export default router;