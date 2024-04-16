import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (userExist) {
      return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "User already exists"));
    }

    try {
      const result = await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword
      });

      const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET);

      res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Registration Successful", { userId: result._id, token: token }));
    } catch (err) {
      res.json(jsonGenerate(process.env.STATUS_CODE_SERVER_ERROR, "Server Error", err));
    }
  } else {
    res.json(jsonGenerate(process.env.STATUS_CODE_VALIDATION_ERROR, "Validation Error", errors.mapped()));
  }
}

export default Register;
