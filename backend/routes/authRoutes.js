const express = require('express');
const authRoutes = express.Router();
const { registerController, loginController, getMe } = require('../controllers/authController.js');


authRoutes.post('/login', loginController);


authRoutes.post('/register', registerController);

authRoutes.get('/getMe', getMe);

module.exports = authRoutes;