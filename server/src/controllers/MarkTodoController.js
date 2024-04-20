import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";

export const MarkTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(jsonGenerate(process.env.STATUS_CODE_VALIDATION_ERROR, "Todo ID is required", errors.mapped()));
    }
    try{
        const todo = await Todo.findOneAndUpdate({_id:req.body.todo_id,userId:req.userId});
        if(todo){
            todo.isCompleted = !todo.isCompleted;
            // Save the updated todo
            await todo.save();
            return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Updated", todo));
        }   
    }catch(err){
    return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Something went wrong", err.message))
}
};

/*another way to toggle between true and false:
 try{
        const todo = await Todo.findOneAndUpdate({_id:req.body.todo_id,userId:req.userId},[{$set:{isCompleted:{$eq:[false,"$isCompleted"]}}}]);
        if(todo){
            return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "Updated", todo));
        }   
    }catch(err){
    return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Something went wrong", err.message))
} */