const isLogin=async(req,res,next)=>{
    try{
        if(req.session.username){}
         
        else{
            res.render("login/login");
        }
        next();
    }
    catch(e){
        console.log(`error occur xa !`);
    }
}



const isLogout=async(req,res,next)=>{
    try{
        if(req.session.username){
            res.render("index")
            
        }
        next();
    }
    catch(e){
        console.log(`error occur hai !`);
    }
}

module.exports={isLogin,isLogout}