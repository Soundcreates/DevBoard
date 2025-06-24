const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');

module.exports.addProject = async (req, res) => {
  const { title, description, teamMembers } = req.body;
  const user = req.user.id;

  try {
    const newProject = await projectModel.create({
      title,
      description,
      createdBy: user,
      teamMembers: teamMembers || user,
    });
    res.status(200).json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }




}

module.exports.getProjects = async (req, res) => {
  const user = req.user.id;
  const role = req.user.role;

  try {

    let projects;
    if (role === 'admin') {
      projects = await projectModel.find().populate('createdBy', 'name email').populate('teamMembers', 'name');

    } else {
      projects = await projectModel.find({
        $or: [
          { createdBy: user },
          { teamMembers: user }
        ]
      }).populate('createdBy', 'name email').populate('teamMembers', 'name');

    }

    return res.status(200).json({ projects });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.getSpecificProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await projectModel.findById(projectId).populate('createdBy', 'name email').populate('teamMembers', 'name');

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!req.user.role === 'admin' && project.createdBy._id.toString() !== req.user.id && !project.teamMembers.some(member => member._id.toString() === req.user.id)) {
      return res.status(403).json({ message: "Access denied" });

    }

    res.status(200).json({ project });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
}

module.exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, description } = req.body;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!req.user.role === 'admin' && project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();
    return res.status(200).json({ message: "Project updated Succesfully", project });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }

}

module.exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) return res.status(403).json({ message: "Project not found" });

    if (!req.user.role === 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    await projectModel.findByIdAndDelete(projectId);

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }


}

module.exports.updateTeam = async (req, res) => {
  const projectId = req.params.projectId;
  const { teamMembers } = req.body;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) return res.statuus(404).json({ message: "Project not found" });

    if (
      req.user.role !== 'admin' && project.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });

    }

    project.teamMembers = teamMembers;
    await project.save();

    res.status(200).json({ message: 'Team updated successfully', project });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }

} 