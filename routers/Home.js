const express = require('express');
const router = express.Router();
const {getbyId }=require('../controllers/blog')
const { getAll } = require('../controllers/user');


router.get('/', async (req, res, next) => {

    const Arr=[];

    try {
        const user = await getAll();
        for(let i=0;i<user.length;i++)
        {
            Arr.push(...user[i].Blogs.slice(-1));
        }
       
      const blogArr=[];

        for(let j=0;j<Arr.length;j++)
        {
            blogArr.push(await getbyId(Arr[j]));
        }

      res.json(blogArr);

    } catch (e) {
        next(e);
    }

})


module.exports = router;