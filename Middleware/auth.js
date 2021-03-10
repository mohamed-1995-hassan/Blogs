const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const user = require('../models/user');
const AsyncVerify=promisify(jwt.verify);

const auth = async (req, res, next) => {


const { headers: { authorization } } = req;
console.log(authorization);

if (!authorization) {
   
  next((new Error('UN_AUTHENTICATED')));
}

try {
    const token = await AsyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
   // console.log(token);
    const { username }=token;
    const use= await user.findOne({ username });
    req.user=use;
    console.log(req.user);
    next();
  } catch (e) {
    next((new Error('UN_AUTHENTICAT')));
  }

};

module.exports=auth;



