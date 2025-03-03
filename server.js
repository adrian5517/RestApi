const express = require('express');
const app = express();

//Routes
app.get('/',(req,res)=>{
    res.send("Hello rest Api")
})

app.listen(3000,()=>{
    console.log("Rest API is Running on Port 3000");
})