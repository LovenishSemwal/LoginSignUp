const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignUp")

.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})


const LogInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1", LogInSchema)

module.exports=collection