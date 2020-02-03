const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      address: {
        type: String,
        
      },
      dob: {
        type: String,
        
      },
      securityQuestion: {
        type: String
      },
      answer1:{
        type: String
      },
      answer2:{
        type: String
      },
      answer3:{
        type: String
      },
      question1:{
        type:String
      },
      question2:{
        type:String
      },
      question3:{
        type:String
      },
      files: {
        type:String
      }
});


// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);