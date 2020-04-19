const express = require('express')
const router = express.Router();
const userModel = require("../model/user"); 
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth");
const userDashboard = require("../middleware/authorization");

//Route for the Login Page
router.get("/",(req,res)=>{
    res.render("login",{
        title:"Login",
        headingInfo: "Login"
    })
});

//Login Page Post Data
router.post("/",(req,res)=>{
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
        //Check if user is in database
        userModel.findOne({email:req.body.Email})
        .then(user=>{
            const error=[];
            if(user==null){         //email not found
                error.push("Sorry, you entered the wrong email and/or password");
                res.render("login",{
                    title:"Login",
                    headingInfo: "Login",
                    authError: error //if authError is same as error type ->error
                });
            }
            else{
                bcrypt.compare(req.body.Pass, user.password)
                .then(isMatched=>{
                    if(isMatched){  //create session
                        req.session.userSession = user;
                        userDashboard(req,res);                 //userDashboard--> delete current + uncomment next line
                        //res.redirect("login/profile");
                    }
                    else{
                        error.push("Sorry, you entered the wrong email and/or password");
                        res.render("login",{
                            title:"Login",
                            headingInfo: "Login",
                            authError: error //if authError is same as error type ->error
                        });
                    }
                })
                .catch(err=>console.log(`Error:${err}`));            
            }
        })
        .catch(err=>console.log(`Error: ${err}`));
    }
});
//router.get("/profile",isAuthenticated,dashBoardLoader);
router.get("/profile", isAuthenticated, (req,res)=>{    //router.get("/profile", isAuthenticated, userDashboard);
    res.render("userDashboard");                                                               //  \_>authorization
});
router.get("/adminProfile", isAuthenticated, (req,res)=>{
    res.render("adminDashboard");
});
//clerkDashboard
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("login",{
        title:"Login",
        headingInfo: "Login",
    });
});

module.exports = router;
