const express = require('express')
const router = express.Router();

//Route for the Login Page
router.get("/",(req,res)=>{
    res.render("login",{
        title:"Login",
        headingInfo: "Login"
    })
});

//Login Page Post Data
router.post("/user",(req,res)=>{
    //error messages variables
    const errorMsgs = [];
    const errorEmail = [];
    const errorPass = [];

    //user input values
    const emailUser = req.body.Email;
    const passUser = req.body.Pass;
    
    //Validation Not Null
    if(emailUser == ""){
        errorEmail.push("* You must enter your email");
        errorMsgs.push("* You must enter your email");
    }    
    if (passUser == ""){
        errorPass.push("* You must enter your password");
        errorMsgs.push("* You must enter your password");
    }
    
    //If user did not enter all information
    if(errorMsgs.length >0){
        const userEmail =req.body.Email;
        res.render("login",{
            title:"Login",
            headingInfo: "Login",
            emailError: errorEmail,
            Email: emailUser,
            passError: errorPass,
            Password: passUser           
        });
    }
    
    //All user inputs valid
    else{
        res.render("clerkDashboard");
        /*res.render("login",{
            title:"Login",
            headingInfo: "Login",
            acceptedInput: 'Welcome Back!'
        });*/
    }
});

module.exports = router;
