const mongoose=require('mongoose');
const { Schema } = mongoose;

const blogSchema=new Schema({
title:{
 type : String,
 minlength : 1,
 
 required : true,
},

body:{
type:String,    
minlength:1,
maxlength:150,
},
tages : [String],
auther:String
,
createdAt:{
type:Date,
default:Date.now(),
},
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
},
image:String,
love:{
    type:Boolean,
    default:false,
}

});
const blogModel=mongoose.model('blog',blogSchema);
module.exports=blogModel;

