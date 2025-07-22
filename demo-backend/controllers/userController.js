import jwt from "jsonwebtoken";
import pool from "../config/postgresConfig.js";
import bcrypt from "bcrypt";
import validator from "validator";

//utils
//create token
const createToken = (user_id, email) => {
  if (user_id) {
    return jwt.sign({ user_id, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3600s",
    });
  }
  return false;
};

//compare user details
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
      return isPasswordMatch;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

//endpoint functions
//Registering new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await pool.query(
      "SELECT * FROM user_data WHERE email_id = $1",
      [email]
    );
    if (isExist.rowCount > 0) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email id" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Saving new user to pg database using query
    const queryResult = await pool.query(
      "INSERT INTO user_data (user_name, email_id, password) VALUES ($1, $2, $3) RETURNING user_id",
      [name, email, hashedPassword]
    );
    if (queryResult.rowCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error in updating DB" });
    }
    const token = createToken(queryResult.rows[0].user_id, email);
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Error creating token!" });
    }
    res.status(200).json({
      success: true,
      message: "Database successfully updated!",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong! in registering user",
    });
  }
};

//get user details
const getUserDetails = async (req, res) => {
  try {
    const userDetails = req.user;
    const user = await pool.query(
      "SELECT user_name FROM user_data WHERE user_id = $1",
      [userDetails.user_id]
    );
    res
      .status(201)
      .json({ success: true, userDetails, user_name: user.rows[0].user_name });
  } catch (e) {
    res.status(401).json({ success: false, error: e });
  }
};

//Signing In
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM user_data WHERE email_id = $1",
      [email]
    );
    const isPasswordMatch = await checkUserCredentials(email, password);
    if (isPasswordMatch) {
      const token = createToken(user.rows[0].user_id, email);
      res.status(201).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Unauthorized!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signInUser, registerUser, getUserDetails };
