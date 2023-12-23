import UserModel from "../models/User_Model.js";
import bcryptjs from "bcryptjs";



export const signup = async(req, res) => {
    
    try{
        const {username, email, password} = req.body;
        const hashPassword = bcryptjs.hashSync(password,10)
        const newUser = new UserModel({username, email, hashPassword});
        await newUser.save();
        res.status(201).json("User created successfully")
    }catch(err){
        res.status(400).json({message:err})
    }
};