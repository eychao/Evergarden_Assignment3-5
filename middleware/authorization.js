const userDashboard = (req,res,next)=>{
    if(req.session.userSession.type=="Admin"){
        res.redirect("/login/adminProfile") //Admin Logged In
    }
    else{
        res.redirect("/login/profile")
    }
}
module.exports = userDashboard;