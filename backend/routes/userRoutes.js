const express = require('express');
const userRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const { getUsers, getOneUser, updateUser, deleteUser, fetchDevelopers } = require('../controllers/userController');


userRoutes.get('/getUsers', authMiddleware, checkPermission('read', 'User'), getUsers);

userRoutes.get('/getDevelopers', authMiddleware, checkPermission('read', 'Developers'), fetchDevelopers);

userRoutes.get('/getUser/:userId', authMiddleware, checkPermission('read', 'User'), getOneUser);

userRoutes.put('/getUser/:userId', authMiddleware, checkPermission('update', 'User'), updateUser);

userRoutes.delete('/getUser/:userId', authMiddleware, checkPermission('delete', 'User'), deleteUser);

module.exports = userRoutes;