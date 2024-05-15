import mongoose from "mongoose";

const userSchemma = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique: true
    },
    password : {
        type:String,
        required:true
    }
},{
    timestamps: true
});

const User = mongoose.model('User' , userSchemma);

export default User;