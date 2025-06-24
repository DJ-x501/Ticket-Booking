const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name:{type:String,required:true},
  email:{type:String,required:true},
  image:{type:String,required:true}
});


module.export = mongoose.model("User", userSchema);