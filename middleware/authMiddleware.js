const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Debug print
  console.log("Incoming headers:", req.headers);

  const authHeader = req.headers["authorization"] || req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach user id to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
