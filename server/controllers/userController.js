import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import UserModel from '../models/User_Model.js'

export const test =  (req,res) => {
    try {
        res.json({
            message:'welcome to the world!!'
        })
    } catch (error) {
        res.json({message:err});
    }
};

export const updateUser = async(req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "you cannot update this account!"))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set : {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new : true });
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "you cannot delete this account!"))
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.clearCookies('access_token');
        res.status(200).json('User has been deleted...')
    } catch (error) {
        next(error)
    }
}