const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('Connected')
});





// const dbUrl="mongodb+srv://prakanshisingh555:dYYHXiRuf8E6BySr@cluster0.wt2lgqp.mongodb.net/?retryWrites=true&w=majority"

// const connectionParams ={
//     useNewUrlParser:true,
//     useUnifiedtopology: true
// }

// mongoose.connect(dbUrl, connectionParams).then(()=>{
//     console.info("Connected")
// })
// .catch((e)=>{
//     console.log("Error:",e);
// })




// mongoose.connect("mongodb://localhost:27017/recipe").then(()=>{
//     console.log("Connected")
// })

require('./Category');
require('./Recipe');