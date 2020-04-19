const isAdmin = (req,res,next)=>{
    if(req.session.userSession.type=="Admin"){
        res.redirect("/task/list") //Admin Logged In
    }
    else{
        res.redirect("/login/profile")
    }
}
module.exports = isAdmin;