import express from 'express';

import { register, login,confirmEmail } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/confirm-email/:verificationToken', confirmEmail);

export default router