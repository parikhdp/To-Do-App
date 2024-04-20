import Todo from "../models/Todo.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const createTodo = async (req, res) => {
    //res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Authorized access", req.userId))
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(jsonGenerate(process.env.STATUS_CODE_VALIDATION_ERROR, "Todo is required", error.mapped()));
    }

    try{
        const result = await Todo.create({
            userId: req.userId, //check app.js last comment for reference
            desc: req.body.desc
    });
    if(result){
        const user = await User.findOneAndUpdate({_id:req.userId},{$push:{todos:result}},{new:true}); //update the user collection with the todo created
        return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Todo created", result))
    }
}catch(err){
    return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Something went wrong", err.message));
}
};