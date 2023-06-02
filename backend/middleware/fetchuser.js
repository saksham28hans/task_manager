const jwt = require('jsonwebtoken');


const fetchUser = (req,res,next)=>{
    
    const token = req.header('auth-token');
    console.log(token);
    if(!token)
    {
        return res.status(401).json({error : "Please authenticate using a valid token"});
    }
   
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err)
            return res.status(403).json("Token is invalid");
            req.user = user;
            next();
        });
}
module.exports = fetchUser;