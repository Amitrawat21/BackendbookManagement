import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    bookname : {
        type : String , 
        required : true,
       
    },
    description :{
        type : String , 
        required : true,

    },
   
    image :{
        type : String , 
     

    },
    price :{
        type : String , 
        required : true,

    },
    image : {
        type : String , 
        required : true,
    },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    

})

const bookdb = mongoose.model("Book" ,bookSchema)

export default bookdb