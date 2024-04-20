import { jsonGenerate } from '../utils/helpers.js';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/*no need to import "loginSchema.js" as in the "api.js" file, the validation is done in the 
  route itself by calling the loginSchema from the "loginSchema.js" file in the validationSchema folder. 
  This middleware will check if the request body is valid or not and if it is invalid, 
  it will send the errors encountered along with the request to this file.*/
const Login = async (req, res) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
       return res.send(errors.mapped());
    }
    else {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Username or password is incorrect"));
        }

        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
            return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Username or password is incorrect"));
        }

        // Set the expiration time to 10 minutes from now
        const expirationTime = Math.floor(Date.now() / 1000) + (10 * 60);

        const token = jwt.sign({ userId: user._id, exp: expirationTime }, process.env.JWT_SECRET);
        return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Login successful", { userId: user._id, token: token }));
    }
};

export default Login;