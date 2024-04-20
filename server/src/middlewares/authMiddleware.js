import { jsonGenerate } from "../utils/helpers.js"
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    if(req.headers.auth===undefined){
        return res.json(jsonGenerate(process.env.STATUS_CODE_UNAUTHORIZED, "Unauthorized access"))
    }
    const token = req.headers.auth;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        return next();
}
    catch(err){
        return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Invalid Token"))
    }
}

export default authMiddleware;
