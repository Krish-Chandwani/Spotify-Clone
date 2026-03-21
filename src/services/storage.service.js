const {ImageKit}=require("@imagekit/nodejs");

const imageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file){
    try{
        const result=await imageKitClient.files.upload({
            file,
            fileName:"music_"+Date.now(),
            folder:"Spotify-Clone/music",
        });
        return result.url;
    }
    catch(err){
        console.error("Error uploading file to ImageKit:",err);
        throw new Error("Failed to upload file");
    }
}

module.exports={uploadFile};
