import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true,
        trim :true,
    },

    email : {
        type : String , 
        required : true,
       unique : true,
    
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
   
    totalBooks :[{
            type: mongoose.Schema.Types.ObjectId, ref: 'Book'    
    }]


})


const userdb = mongoose.model("users" ,userSchema)

export default userdb