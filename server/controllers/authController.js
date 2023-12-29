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


export const google = async(req, res, next) => {
    
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new UserModel({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}
export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({message: 'Logout successfully!!'})
    } catch (error) {
        next(error);
    }
}