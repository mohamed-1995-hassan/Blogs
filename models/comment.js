const mongoose=require('mongoose');
const { Schema } = mongoose;

const commentSchema=new Schema({

body:{
type:String,    
maxlength:150,
},

createdAt:{
type:Date,
default:Date.now(),
},
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
},
blogId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'blog'
}

});
const commentModel=mongoose.model('comment',commentSchema);
module.exports=commentModel;

