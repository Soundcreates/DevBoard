const userModel = require('../models/userModel.js');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
}

module.exports.getOneUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const specificUser = await userModel.findById(userId);
    if (!specificUser) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ specificUser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try agian later" });
  }
}

module.exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { name, email, role } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Internal server error' });

  }
}

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await userModel.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}