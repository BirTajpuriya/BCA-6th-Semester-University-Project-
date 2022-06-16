const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/wastetoart").then(()=>{
    console.log(`connection made !`);
}).catch((e)=>{
    console.log(`fail to connect`);
});