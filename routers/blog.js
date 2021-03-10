const express = require('express');
const router = express.Router();
const { create, getAll, getbyId, editeblog, deleteByid, getTitle, getByTag ,getall} = require('../controllers/blog')
const { editeone } = require('../controllers/user')
// const equal = require('deep-equal');
const multer = require('multer')
const path = require('path');
var cors = require('cors');

router.use(cors());


const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, 'public/images');
    }, filename: function (req, file, cb) {

        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });



router.post('/', upload.single('file'), async (req, res, next) => {
    try {

        const { body, user } = req
        const _file = req.file.filename;
        const blog = await create({ ...body, userId: user._id, image: "http://localhost:3000/static/images/" + _file });
        //  const blg_id = blog._id;
        //  user.Blogs.push(blg_id);
        res.json(blog);
        //  const edit = await editeone(user._id, { ...user });

    }
    catch (e) {
        next(e);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const { user: { _id } } = req
        const blog = await getAll({ userId: _id });
        res.json(blog)
    } catch (e) {
        next(e);
    }
})


router.get('/all', async (req, res, next) => {
    try {
        
        const blog = await getall();
        res.json(blog)
    } catch (e) {
        next(e);
    }
})


// const a={
//     v:(c)=>{

//         if(c())
//         return true;
//         else return false;
//     }
// }

// var s=function f(){
//     return 6>5;
// }

// router.get('/test',(req,res,next)=>{

//     res.json({"result":a.v(s)});
// })



router.get('/:id', async (req, res, next) => {
    try {

        const blog = await getbyId(req.params.id);
        res.json(blog)
    } catch (e) {
        next(e);
    }
})


router.get('/title/:name', async (req, res, next) => {

    try {
        const title = req.params.name;
        const blog = await getTitle({ title});
        res.json(blog);
        

    } catch {

        next(e);
    }

})

router.get('/tag/:name', async (req, res, next) => {

    try {
        const tages = req.params.name;
        const blog = await getByTag({ tages: { "$regex": tages, "$options": "i" } });
        res.json(blog);

    } catch {

        next(e);
    }
})


router.patch('/:id', async (req, res, next) => {
    try {
        const blog = await editeblog(req.params.id, req.body);
        res.json(blog)
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const blog = await deleteByid(req.params.id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})






module.exports = router;