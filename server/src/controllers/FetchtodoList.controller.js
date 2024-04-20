import User from "../models/User.js";
import { jsonGenerate } from "../utils/helpers.js";

export const GetTodos = async (req, res) => {
    try{
        const list = await User.findById(req.userId).select("-password").populate("todos"); //removing password from the response. The final list variable contains the user document with the todos field populated with all the data of the todos associated with that particular user. This happens due to the "populate" method.
        return res.json(jsonGenerate(process.env.STATUS_CODE_SUCCESS, "List of todos", list))
    }catch(err){
        return res.json(jsonGenerate(process.env.STATUS_CODE_UNPROCESSABLE_ENTITY, "Something went wrong", err.message));
    }
}