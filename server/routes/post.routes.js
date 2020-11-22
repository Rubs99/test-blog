const express= require('express');
const router= express.Router();

const post= require('../controllers/post.controller');
const upload= require('../libs/storage');

router.get('/',post.getPosts);
router.post('/',upload,post.createPost);
router.delete('/:id',post.deletePost);
router.put('/:id',upload,post.editPost);

module.exports=router;