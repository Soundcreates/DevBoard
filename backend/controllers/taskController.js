const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');

module.exports.fetchTasksToUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await taskModel.find({ assignedTo: userId }).populate('assignedTo', 'name role').populate('createdBy', 'name role').populate('project', 'title');

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res.status(200).json({ tasks: tasks });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
}
module.exports.createTask = async (req, res) => {
  const { title, description, assignedTo, project, dueDate } = req.body;
  console.log(req.body);
  try {
    if (!req.user || req.user.role !== 'pm') {
      return res.status(403).json({ message: "Access denied, only Pms can create a task" });
    }

    const projectAssignedTo = await projectModel.findById(project)
    if (!projectAssignedTo) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!projectAssignedTo.teamMembers.includes(assignedTo)) {
      return res.status(400).json({ message: "User is not a team member of this project" });

    }

    const task = await taskModel.create({
      title,
      description,
      assignedTo,
      project,
      createdBy: req.user.id,
      dueDate,
    });

    const populatedTask = await taskModel.findById(task._id)
      .populate('assignedTo', 'name role')
      .populate('createdBy', 'name role')
      .populate('project', 'title');

    return res.status(200).json({ message: "Task created successfully", task: populatedTask });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error again , please try again later" })
  }


}

module.exports.fetchTasks = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const task = await taskModel.find({ project: projectId }).populate('assignedTo', 'name role');
    if (!task) return res.status(404).json({ message: "No task found" });

    return res.status(200).json({ tasks: task });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error again , please try again" });
  }


}


module.exports.fetchSpecificTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskModel.findById(taskId).populate('assignedTo', 'name role').populate('createdBy', 'name role').populate('project', 'title');
    if (!task) return res.status(404).json({ message: "No task found" });
    return res.status(200).json({ task: task });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error again , please try again" });
  }

}

module.exports.updateTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const taskId = req.params.taskId;
  try {
    const task = await taskModel.findById(taskId).populate('assignedTo', 'name role').populate('createdBy', 'name role').populate('project', 'title');
    if (!task) return res.status(404).json({ message: "No task found" });



    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) task.assignedTo = assignedTo
    if (status) task.status = status;
    await task.save();

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error again , please try again" });
  }

}

module.exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await taskModel.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found or already deleted" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }

}

module.exports.assignTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { assignedTo } = req.body;

  try {
    const task = await taskModel.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await projectModel.findById(task.project);
    if (!project.teamMembers.includes(assignedTo)) {
      return res.status(400).json({ message: "User is not a team member of this project" });
    }

    task.assignedTo = assignedTo;
    await task.save();

    const updatedTask = await taskModel.findById(taskId)
      .populate('assignedTo', 'name role')
      .populate('createdBy', 'name role')
      .populate('project', 'title');

    return res.status(200).json({ message: "Task reassigned", task: updatedTask });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}