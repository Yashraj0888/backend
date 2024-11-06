const mongoose=require('mongoose');

const MONGO_URL=process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(()=>{
    console.log('connected to mongoose server');
    
}).catch((err)=>{
    console.log('error connecting to mongoDB',err);
})