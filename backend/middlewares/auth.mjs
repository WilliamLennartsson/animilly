import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send({ message: "You are not logged in" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || !user) return res.status(401).send({ message: "Unauthorized" });
    req.user = user;
    next();
  });
};
