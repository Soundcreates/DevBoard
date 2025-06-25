const express = require('express');
const commentRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');

commentRoutes.post('/addComment/:taskId', authMiddleware, addComment);

commentRoutes.get('/getComments/:taskId', authMiddleware, getComments);

commentRoutes.put('/updateComment/:commentId', authMiddleware, updateComment);

commentRoutes.delete('/deleteComment/:commentId', authMiddleware, deleteComment);



module.exports = commentRoutes;
