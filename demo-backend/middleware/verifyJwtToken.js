import jwt from "jsonwebtoken";

const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, error: "Access Denied" });
  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = isValidToken;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export default verifyJwtToken;
