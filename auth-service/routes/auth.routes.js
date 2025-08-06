import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);