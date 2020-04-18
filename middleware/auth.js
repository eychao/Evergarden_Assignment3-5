const userLoggedIn = (req,res,next)=>{
    if(req.session.userSession){
        next();
    }
    else{
        res.redirect("/login")
    }
}
module.exports = userLoggedIn;