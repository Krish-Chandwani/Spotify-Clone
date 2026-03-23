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

async function getAllMusics(req,res){
    const musics=await musicModel.find();
    res.status(200).json({musics});
}

async function getAllAlbums(req,res){
    const albums=await albumModel.find().select('-music').populate('artist','username');
    res.status(200).json({albums});
}

async function getAlbumsById(req,res){
    const {id}=req.params;
    const album=await albumModel.findById(id).populate('artist','username').populate('music');
    res.status(200).json({album});
}

module.exports={createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumsById};
