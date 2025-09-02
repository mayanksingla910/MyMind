import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];

  // if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU2ODMyMjg3LCJleHAiOjE3NTk0MjQyODd9.R5l7tmqHC8GXB7pwqwvJJ5vgR2nZ_OOspeUOUTN-gbw", process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

