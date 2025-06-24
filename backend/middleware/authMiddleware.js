const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorizaton;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    token = authHeader.split("")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      req.user = {
        id: decoded.id,
        role: decoded.role
      }
      next();
    } else {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error please try again later" });
  }
}