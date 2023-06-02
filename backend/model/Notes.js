const mongoose = require('mongoose');

const NotesSchema =new mongoose.Schema({
    title : {type:String,required:true,unique:true},
    description : {type:String},
    completed : {type:Boolean, default:false},
    userId: {type:String}
    },
     {timestamps:true}
  );

  module.exports = mongoose.model("Notes",NotesSchema);