const express= require('express');
const router= express.Router();

const upload= require('../libs/storage');
const user= require('../controllers/user.controller');

router.get('/:id', user.getUser);
router.post('/', upload, user.createUser);
router.put('/:id',upload,user.editUser);

module.exports= router;