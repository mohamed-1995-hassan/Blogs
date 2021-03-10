const user=require('../models/user');
const comment=require('../models/comment')
const jwt=require('jsonwebtoken');
const { promisify }=require('util');
const asyncsign=promisify(jwt.sign);


const creat=(body)=>user.create(body);
const getAll=()=>user.find({});

const deletbyId=(id) =>user.deleteOne(id).exec();

const editeone=(id,img)=>user.updateOne({_id:id},{image:img},{new:true}).exec();

const getbyId=(id)=>user.findById(id).exec();

const pushfollowID = async(id, targetid)=>{

   const loggedUser = await user.findById(id).exec();
    user.updateOne({_id:id} ,{ $push : {Following: targetid } } ,{new:true}).exec()
    user.updateOne({_id:targetid}, { $push: { Followers: id } }, { new: true }).exec();
    return {"status":"followed"}

}

const unfollow = (id, targetid)=>{
    user.updateOne({_id:id },{ $pull : {Following: targetid } } ,{new:true}).exec()
    user.updateOne({_id:targetid}, { $pull: { Followers: id } }, { new: true }).exec();
    return {"status":"unfollowed"}
    }


   const saveComment=(body)=>comment.create(body);

   const getCommentsById=(id)=>comment.find({blogId:id}).exec();



const login=async(username,password)=>{
    const use= await user.findOne({username}).exec();
     if(!use)
     {
        
         throw Error('Wrong password and user name');
     }

      const check=use.validatePassword(password);
     if(!check)
     {
         throw Error('UN_AUTHENTICATED');
         
     }

     const token =jwt.sign({

     username : use.username,
     password : use.password,

     },'SECRET_MUST_BE_COMPLEX',{ expiresIn: '1d' });

     

    return  {...use.toJSON(),token} ; 

}


module.exports={

    creat,getAll,deletbyId,editeone,login,getbyId,pushfollowID,unfollow,saveComment,getCommentsById,
}