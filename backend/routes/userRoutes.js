const express = require('express');
const userRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const { getUsers, getOneUser, updateUser, deleteUser } = require('../controllers/userController');


userRoutes.get('/getUsers', authMiddleware, checkPermission('read', 'User'), getUsers);

userRoutes.get('/getUser/:userId', authMiddleware, checkPermisison('read', 'User'), getOneUser);

userRoutes.put('/getUser/:userId', authMiddleware, checkPermission('update', 'User'), updateUser);

userRoutes.delete('/getUser/:userId', authMiddleware, checkPermission('delete', 'User'), deleteUser);

module.exports = userRoutes;