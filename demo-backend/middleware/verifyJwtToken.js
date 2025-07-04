import jwt from "jsonwebtoken";

const verifyJwtToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token)
    return res.status(401).json({ success: false, error: "Access Denied" });
  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (isValidToken) {
      res.status(200).json({ success: true, message: "User Authorized" });
      next();
    }
  } catch (e) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

export default verifyJwtToken;
