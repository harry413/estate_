import dotenv from "dotenv"
dotenv.config();

import UserModel from "../models/User_Model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



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
export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    
try{
    const existingUser = await UserModel.findOne({email});
    if(!existingUser){
        return next(errorHandler(404, 'User not found!'));
    }
    const validPassword = bcryptjs.compareSync(password, existingUser.password);
    if(!validPassword){
        return next(errorHandler(401, 'Invalid password'));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password:pass, ...rest } = existingUser._doc;
    res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
}catch(error){
    next(error);   
}
};