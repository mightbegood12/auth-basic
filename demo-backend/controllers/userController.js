import jwt from "jsonwebtoken";
import pool from "../config/postgresConfig.js";
import bcrypt from "bcrypt";

const createToken = (emailId) => {
  return jwt.sign({ emailId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3600s",
  });
};

const checkUserCredentials = async (emailId, password) => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_data WHERE email_id = $1",
      [emailId]
    );
    // console.log(result.rows[0]);
    if (result.rowCount > 0) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      console.log(isPasswordMatch);
      return isPasswordMatch;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

//Registering new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    res.status(200).json({ success: true, message: "User details" });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
      message: "Something went wrong! in register user",
    });
  }
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
    const isMatch = await checkUserCredentials(email, password);
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
