const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');

async function registerUser(req,res){
    const {username,email,password,role='user'}=req.body;

    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExists){
        return res.status(409).json({message:'User with the same username or email already exists'});
    }

    const user=await userModel.create({
        username,
        email,
        password,
        role
    });

    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);

    res.cookie('token',token);


    res.status(201).json({message:'User registered successfully', user});

}