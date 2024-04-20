import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helpers.js';
import Todo from '../models/Todo.js';
import User from '../models/User.js';

export const RemoveTodo = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(process.env.STATUS_CODE_VALIDATION_ERROR,"Todo id is required.",errors.mapped()));
    }
    try{
        const result = await Todo.findOneAndDelete({_id:req.body.todo_id,userId:req.userId});
        if(result){
            const user = await User.findOneAndUpdate({_id:req.userId},{$pull:{todos:req.body.todo_id}},{new:true}); //$pull is used to remove the todo from the todos array in the user collection. It is the opposite of $push. 
            return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS,"Todo removed",result));
        }
    }catch(err){
        return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY,"Something went wrong",err.message));
    }
};