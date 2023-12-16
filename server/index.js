import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully ")
}).catch((err) => {
    console.log(err);
});

const App = express();

const PORT = 3000;
App.get('/', (req, res) => {
    try{
        console.log('welcome to home!!!');
    }catch(err){
        console.log(err);
    }
})

App.listen(PORT, () => {
    console.log(`server is running on post ${PORT}`);
})