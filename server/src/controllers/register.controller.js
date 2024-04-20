import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req); /*no need to import "registerSchema.js" as in the "api.js" file, the validation is done in the 
  route itself by calling the registerSchema from the "registerSchema.js" file in the validationSchema folder. 
  This middleware will check if the request body is valid or not and if it is invalid, 
  it will send the errors encountered along with the request to this file.*/
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