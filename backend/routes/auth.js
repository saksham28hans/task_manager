const router = require('express').Router();
const User = require('../model/User')
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register user

router.post('/register',async (req,res)=>{

    const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })

    try{
        //Check whether a user with the emailId already exists.
      let check = await User.findOne({email:req.body.email});
      if(check)
      {
          return res.status(400).json({error:"Sorry this emailId already exists"});
      }
     
        const user = await newUser.save();
        const {password, ...info} = user._doc;
        const authToken = jwt.sign(
            {id: user._id},process.env.SECRET_KEY, {expiresIn: "5d"});
            return res.status(200).json({...info,authToken})
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

})



//Login User

router.post('/login', async(req,res)=>{
    try {

        console.log("Hello");
        const user = await User.findOne({email : req.body.email});
        console.log(req.body.email);
        if(!user)
        {
            return res.status(401).json("Wrong username or password");
        }
        
        const bytes  = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
        if(originalPassword !== req.body.password)
        return res.status(401).json("Wrong username or password");

        const {password, ...info} = user._doc;
        const authToken = jwt.sign(
            {id: user._id},process.env.SECRET_KEY, {expiresIn: "5d"});
            return res.status(200).json({...info,authToken})
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router