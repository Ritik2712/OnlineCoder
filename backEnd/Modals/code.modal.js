const mongoose = require('mongoose');

const Schema = mongoose.Schema

const codeSchema = new Schema({
    creator:{
        type: String,
        required:true,
        trim: true,
        minlength: 3
    },
    html:{
        type:String,
    },
    css:{
        type:String,
    },
    js:{
        type:String,
    }
});

const Code = mongoose.model('Code',codeSchema);

module.exports=Code