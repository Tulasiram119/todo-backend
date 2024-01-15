const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Invalid creditionals" });
  }
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403);

    req.userEmail = decoded.email;
    req.id = decoded.id;
  });
  next();
};

module.exports = fetchUser;
