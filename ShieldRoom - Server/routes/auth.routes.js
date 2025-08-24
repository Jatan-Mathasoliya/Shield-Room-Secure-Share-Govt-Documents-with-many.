import { Router } from 'express';
import { sendSignupOTP, verifySignupOTP ,sendLoginOTP,verifyLoginOTP } from '../controllers/auth.controller.js';
import { reSendOtp, forgotPasswordOTP ,forgotPassOTPVerify, resetPassword, logOut } from '../controllers/auth.controller.js';
const authRoutes = Router();

authRoutes.post('/signup/send-otp', sendSignupOTP);
authRoutes.post('/signup/verify-otp', verifySignupOTP);
authRoutes.post('/login/send-otp', sendLoginOTP);
authRoutes.post('/login/verify-otp', verifyLoginOTP);
authRoutes.post('/otp/resend', reSendOtp);
authRoutes.post('/forgot-password/send-otp', forgotPasswordOTP);
authRoutes.post('/forgot-password/verify-otp', forgotPassOTPVerify);
authRoutes.post('/forgot-password/reset', resetPassword);
authRoutes.post('/logout', logOut);

export default authRoutes;
