const express = require('express');
const taskRoutes = express.Router();
const Task = require('../models/taskModel');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const { createTask, fetchTasks, fetchSpecificTask, updateTask, deleteTask, assignTask } = require('../controllers/taskController');

taskRoutes.post('/createTask', authMiddleware, checkPermission('create', 'Task'), createTask);

taskRoutes.get('/fetchTasks/:projectId', authMiddleware, checkPermission('read', 'Task'), fetchTasks);

taskRoutes.get('/fetchTasks/:taskId', authMiddleware, checkPermission('read', 'Task'), fetchSpecificTask);

taskRoutes.put('/updateTask/:taskId', authMiddleware, checkPermission('update', 'Task'), updateTask);

taskRoutes.delete('/deleteTask/:taskId', authMiddleware, checkPermission('delete', 'Task'), deleteTask);

taskRoutes.put('/:taskId/assignTask', authMiddleware, checkPermission('assign', 'Task'), assignTask);

module.exports = taskRoutes;