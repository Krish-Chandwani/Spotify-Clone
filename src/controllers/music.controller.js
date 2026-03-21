const musicModel=require('../models/music.model');
const {uploadFile}=require('../services/storage.service');
const jwt=require('jsonwebtoken');

async function createMusic(req,res){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=='artist'){
            return res.status(403).json({message:'You Dont have access to create music'});
        }

        const {title}=req.body;
        const file=req.file;
        // console.log(file);
        
        const result=await uploadFile(file.buffer.toString('base64'));
        console.log(result);

        const music=await musicModel.create({
            uri:result,
            title,  
            artist:decoded.id,
        });

        res.status(201).json({message:'Music created successfully',music});
    }

    catch(err){
        console.error('Error creating music:',err);
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports={createMusic};
