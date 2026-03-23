const jwt=require('jsonwebtoken');

async function authArtist(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=='artist'){
            return res.status(403).json({message:'You Dont have access to this route'});
        }
        req.user=decoded;
        next();
    }
    catch(err){
        console.error('Error authenticating artist:',err);
        res.status(500).json({message:'Internal server error'});
    }
}

async function authUser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;

        if(decoded.role!=='user'){
            return res.status(403).json({message:'You Dont have access to this route'});
        }
        next();
    }catch(err){
        console.error('Error authenticating user:',err);
        res.status(500).json({message:'Internal server error'});
    }
}


module.exports={authArtist, authUser};