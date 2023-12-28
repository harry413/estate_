import dotenv from "dotenv"
dotenv.config();

import express from "express"
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors'

const App = express();


App.use(cookieParser());
App.use(cors());

//importing routes
import userRouter from "./routes/userRoute.js"
import authRouter from './routes/authRoute.js'

App.use(express.json());
App.use('/api/user', userRouter);
App.use('/api/auth', authRouter);

App.use((err, req, res, next) => {
    const statusCode = err.statusCode|| 500;
    const message = err.message ||"internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


const PORT = 3000;

//Database connection mongodb
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully ")
}).catch((err) => {
    console.log(err);
});


App.get('/', (req, res) => {
    try{
        res.json({message:'hello welcome to home page!!!'})
    }catch(err){
        console.log(err);
        res.json({message:err});
    }
})

App.listen(PORT, () => {
    console.log(`server is running on post ${PORT}`);
})