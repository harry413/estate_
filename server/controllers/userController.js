export const test =  (req,res) => {
    try {
        res.json({
            message:'welcome to the world!!'
        })
    } catch (error) {
        res.json({message:err});
    }
};