import UserModel from "../models/User_Model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";



export const signup = async(req, res, next) => {
        const {username, email, password} = req.body;
        const hashPassword = bcryptjs.hashSync(password, 10)
        const newUser = new UserModel({username, email, password: hashPassword});
        
    try{
        await newUser.save();
        res.status(201).json("User created successfully")
    }catch(error){
        next(error);   
    }
};