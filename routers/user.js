
const express = require('express');
const router = express.Router();
const { creat, getAll, deletbyId, editeone, login, getbyId, pushfollowID, unfollow, saveComment, getCommentsById } = require('../controllers/user');
const auth = require('../Middleware/auth')
var cors = require('cors');
const multer = require('multer')
const path = require('path');

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

        const { body } = req;
        const _file = req.file.filename;
        console.log(req.file.path);
        const user = await creat({ ...body, image: "http://localhost:3000/static/images/" + _file });
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.get('/', auth, async (req, res, next) => {

    try {
        const user = await getAll();
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.get('/:id', auth, async (req, res, next) => {

    try {
        const id = req.params.id;
        const user = await getbyId(id);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', auth, async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const user = await deletbyId({ _id: id });
        res.json(user)

    } catch (e) {
        next(e);
    }

})


router.patch('/:id',upload.single('file'), async (req, res, next) => {
     const { params: { id }, body } = req;
     const _file = req.file.filename;
     console.log(_file);
     console.log(id);
     const img="http://localhost:3000/static/images/" + _file
     try {
         const user = await editeone(id,img);
         res.json(user);

     } catch (e) {
         next(e);
     }



})

router.post('/login', async (req, res, next) => {

    try {
        const user = await login(req.body.username, req.body.password);
        res.json(user);
    } catch (e) {
        next(e);
    }

})


router.post('/follow/:fid', auth, async (req, res, next) => {
    const { user: { _id }, params: { fid } } = req;
    try {
        const userfollowID = await pushfollowID(_id, fid);
        res.json(userfollowID);
    } catch (e) {
        next(e);
    }
})

router.post('/unfollow/:fid', auth, async (req, res, next) => {
    const { user: { _id }, params: { fid } } = req;
    try {
        const userunfollowID = await unfollow(_id, fid);
        res.json(userunfollowID);
    } catch (e) {
        next(e);
    }
})

router.post('/comment', auth, async (req, res, next) => {
    const { body } = req;

    try {
        const comment = await saveComment(body);
        res.json(comment);
    } catch (e) {
        next(e)
    }
})



router.get('/comments/:id', auth, async (req, res, next) => {

    const { params: { id } } = req;
    try {
        const allComments = await getCommentsById(id);
        res.json(allComments);
    } catch (e) {
        next(e);
    }



})






module.exports = router;