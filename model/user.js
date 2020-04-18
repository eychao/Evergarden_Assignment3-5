const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt =require("bcryptjs");

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", function(next){  //before the save is called in controllers/customer-reg.js
    //genSalt, randomly generate characters/strings/text
    //10, higher the more complex but takes more CPU
    bcrypt.genSalt(10)  
    .then((salt)=>{
        bcrypt.hash(this.password, salt)  //this.password refers to /controllers/customr-regs.js -> newUser object
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();
        })
        .catch(err=>console.log(`Error happened when hashing user password: ${err}`));
    })
    .catch(err=>console.log(`Error happened when encrypting user password: ${err}`));
})

const userModel = mongoose.model('User', userSchema);   //User--> is named "users" in database
module.exports = userModel;