const express = require("express");
const cors = require("cors");
const  connectDB = require("./configs/db");
require("dotenv").config();
const {clerkMiddleware} = require('@clerk/express');

const {serve} = require("inngest/express");
const {inngest,functions} = require("./inngest/index");



const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use(clerkMiddleware());

app.get('/', function(req,res){
    res.send("Server is LIVE!");
});

app.use('/api/inngest', serve({client:inngest,functions}))


app.listen(port,  async function(){
    console.log("server is running");
    await connectDB();
});


