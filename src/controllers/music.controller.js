const musicModel=require('../models/music.model');
const albumModel=require('../models/album.model');
const {uploadFile}=require('../services/storage.service');
const jwt=require('jsonwebtoken');

async function createMusic(req,res){
    const file=req.file;
    const {title}=req.body;
    // console.log(file);
    const result=await uploadFile(file.buffer.toString('base64'));
    console.log(result);

    const music=await musicModel.create({
    uri:result,
    title,  
    artist:req.user.id,
    });

    res.status(201).json({message:'Music created successfully',music});
}


async function createAlbum(req,res){
    const {title,musics}=req.body;

    const album=await albumModel.create({
        title,
        artist:req.user.id,
        music:musics
    }); 

    res.status(201).json({message:'Album created successfully', album});
}

module.exports={createMusic, createAlbum};
