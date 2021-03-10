const express=require('express');
const router=express.Router();
const blog=require('./blog');
const user=require('./user');
const last=require('./Home')


const auth=require('../Middleware/auth')
var cors = require('cors');


router.use(cors());
router.use('/user',user);
router.use('/blog',auth,blog);
router.use('/home',last);









module.exports=router;
