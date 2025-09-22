const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  // Split "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.admin = decoded;
    next();
  });
};
