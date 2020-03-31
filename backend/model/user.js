const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
   username:{
       type: String,
       required:true,
       minlength:5,
       maxlength:25
   },
   email:{
       type: String,
       required:true,
       unique:true,
       minlength:5
   },
   password:{
       type: String,
       required:true,
       minlength:8
   },
   phone:{
       type: String,
       required:true,
       minlength:10
   }
});

const User= mongoose.model('User',userSchema);

function validateUser(user){
    const schema={
        username: Joi.string().min(5).max(25).required(),
        email: Joi.string().min(5).required().email(),
        phone: Joi.string().min(10).required(),
        password: Joi.string().min(8).required()
    }

    return Joi.validate(user,schema);
   
}

exports.User=User;
exports.validate=validateUser;
exports.userSchema=userSchema;