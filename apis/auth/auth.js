const router=require('express').Router();
const User=require('../../models/User')
const Joi=require('@hapi/joi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}=require('../../validation')

const schema=Joi.object({
    firstName:Joi.string().min(2).required(),
    lastName:Joi.string().min(2).required(),
    userName:Joi.string().min(6).required(),
    password:Joi.string().min(6).required()
})

router.post('/register',async  (req,res)=>{

    const {error}=registerValidation(req.body)
    if(error)
          res.status(400).send(error.details[0].message)

    //check username exists

    const userObj=await User.findOne({userName:req.body.userName})
    if(userObj) return res.status(400).send("UserName already exist")

    //Hash the passwords

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await  bcrypt.hash(req.body.password,salt);


    const user=new User(req.body)
    user.password=hashedPassword;
    try{
        const savedUser=await user.save();
        res.send({user:user._id})
    }
    catch (err){
        res.status(400).send(err);
    }
})

router.post('/login',async  (req,res)=>{

    const {error}=loginValidation(req.body)
    if(error)
        res.status(400).send(error.details[0].message)

    //check username exists
    const userObj=await User.findOne({userName:req.body.userName})
    if(!userObj) return res.status(400).send("UserName doesn't exist")
    //password is correct

    const validPass=await bcrypt.compare(req.body.password,userObj.password)
    if(!validPass)
        return res.status(400).send('Wrong password !')

    //create and assign a token
    const token=jwt.sign({_id:userObj._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)
    res.send('Logged IN')


})

module.exports=router