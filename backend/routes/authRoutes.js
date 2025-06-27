const express = require('express');
const authRoutes = express.Router();
const { registerController, loginController, getMe } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

authRoutes.post('/login', loginController);


authRoutes.post('/register', registerController);

authRoutes.get('/getMe', authMiddleware, getMe);

module.exports = authRoutes;