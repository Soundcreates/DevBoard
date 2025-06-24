const defineAbilitiesFor = require('../config/ability');

const checkPermission = (action, subject) => {
  return (req, res, next) => {
    const ability = defineAbilitiesFor(req.user.role, req.user.id);

    if (ability.can(action, subject)) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = checkPermission;