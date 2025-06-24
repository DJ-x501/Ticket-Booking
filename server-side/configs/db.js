const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected successfully");
    } catch (error) {
        console.log("error", error.message);
    }
}

module.exports =  connectDB;