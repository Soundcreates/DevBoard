const express = require('express');
const projectRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const { addProject, getProjects, getSpecificProject, updateProject, deleteProject, updateTeam } = require('../controllers/projectController');


projectRoutes.post('/addProjects', authMiddleware, checkPermission('create', 'Project'), addProject);

projectRoutes.get('/getProjects', authMiddleware, checkPermission('read', 'Project'), getProjects);

projectRoutes.get('/getProjects/:projectId', authMiddleware, checkPermission('read', 'Project'), getSpecificProject);

projectRoutes.put('/updateProjects/:projectId', authMiddleware, checkPermission('update', 'Project'), updateProject);

projectRoutes.delete('/deleteProjects/:projectId', authMiddleware, checkPermission('delete', 'Project'), deleteProject);

projectRoutes.put('/updateProjects/:projectId/team', authMiddleware, checkPermission('update', 'Team'), updateTeam);


module.exports = projectRoutes;