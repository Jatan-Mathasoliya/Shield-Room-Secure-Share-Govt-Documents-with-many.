import { Router } from 'express';
import { sendSignupOTP } from '../controllers/auth.controller.js';
import { verifySignupOTP } from '../controllers/auth.controller.js';
import { sendLoginOTP } from '../controllers/auth.controller.js';
import { verifyLoginOTP } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/signup/send-otp', sendSignupOTP);
authRoutes.post('/signup/verify-otp', verifySignupOTP);
authRoutes.post('/login/send-otp', sendLoginOTP);
authRoutes.post('/login/verify-otp', verifyLoginOTP);

export default authRoutes;
