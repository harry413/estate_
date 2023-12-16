import express from "express"

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