import jwt from "jsonwebtoken";

let authorized_user = {
  email: "sample@gmail.com",
  password: "dddd",
};

const createToken = (emailId) => {
  return jwt.sign({ emailId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3600s",
  });
};

const checkUserCredentials = (emailId, password) => {
  if (
    emailId == authorized_user.email &&
    password == authorized_user.password
  ) {
    return true;
  }
  return false;
};

//Registering new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
};

const getUserDetails = async (req, res) => {
  try {
    res.status(201).json({});
  } catch (e) {}
};

//Signing In
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isMatch = checkUserCredentials(email, password);
    if (isMatch) {
      const token = createToken(email);
      res.status(201).json({ success: true, token });
    } else {
      res.status(201).json({ success: false, message: "Unauthorized!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signInUser, registerUser, getUserDetails };
