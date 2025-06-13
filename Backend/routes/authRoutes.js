    import express from 'express';
    import AuthController from '../controllers /authController.js';

    const router = express.Router();

    // Register User or Partner
    router.post('/register', AuthController.register);

    // Login
    router.post('/login', AuthController.login);

    export default router;