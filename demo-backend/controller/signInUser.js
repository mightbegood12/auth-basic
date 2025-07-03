import jwt from "jsonwebtoken";

let authorized_user = {
  email: "sample@gmail.com",
  password: "dddd",
};

const createToken = (emailId) => {
  return jwt.sign({ emailId }, "sample_key_2040402", { expiresIn: "3600s" });
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

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isMatch = await checkUserCredentials(email, password);
    if (isMatch) {
      const token = createToken(email);
      res.status(201).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Unauthorized!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signInUser };
