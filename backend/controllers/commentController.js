const commentModel = require('../models/commentModel');

// ✅ Add Comment
module.exports.addComment = async (req, res) => {
  const taskId = req.params.taskId;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await commentModel.create({
      content,
      task: taskId,
      author: userId,
    });

    const populated = await commentModel.findById(newComment._id).populate('author', 'name role');
    return res.status(200).json({ newComment: populated });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
};

// ✅ Get Comments
module.exports.getComments = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const comments = await commentModel.find({ task: taskId }).populate('author', 'name role');
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments available" });
    }

    return res.status(200).json({ comments });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later!" });
  }
};

// ✅ Update Comment
module.exports.updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;

  try {
    const comment = await commentModel.findById(commentId).populate('author');
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author._id.toString() !== req.user.id && req.user.role === 'developer') {
      return res.status(403).json({ message: "You can only edit your own comment" });
    }

    comment.content = content;
    await comment.save();
    return res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later!" });
  }
};

// ✅ Delete Comment
module.exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await commentModel.findById(commentId).populate('author');
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const isOwner = comment.author._id.toString() === req.user.id;
    const isPrivileged = req.user.role === 'admin' || req.user.role === 'pm';

    if (!isOwner && !isPrivileged) {
      return res.status(403).json({ message: "You are not allowed to delete this comment" });
    }

    await commentModel.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Comment deleted successfully" });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
};
