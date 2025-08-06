import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/auth.controller.js';

console.log('Auth routes loaded');
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;