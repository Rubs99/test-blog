const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { unlink } = require('fs-extra');

const userController = {};
let userPath;


userController.getUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id);
        res.json(user);

    } catch (err) {

        res.status(400).json({
            ok: false,
            err
        });

    }
}



userController.createUser = async (req, res) => {

    try {


        let body = req.body;
        const userDb = await User.findOne({ email: body.email });

        if (userDb) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email it´s already create'
                }
            });

        }

        let user = new User({

            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            filename: req.file.filename,
            path: '/img/uploads/' + req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size

        });

        userPath = user;
        const saved = await user.save({});
        let token = await jwt.sign({
            user: saved
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            user: saved,
            token

        })
    } catch (err) {

        unlink(path.resolve('./server/libs/public' + userPath.path));
        res.status(400).json({
            ok: false,
            err

        })

    }
}


userController.editUser = async (req, res) => {
    try {

        const { id } = req.params;

        if (req.file) {
            var user = {
                name: req.body.name,
                filename: req.file.filename,
                path: '/img/uploads/' + req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        } else {
            var user = {
                name: req.body.name,



            }
        }

        const userDb = await User.findOne({ _id: id });

        unlink(path.resolve('./server/libs/public' + userDb.path));
        await User.findByIdAndUpdate({ _id: id }, { $set: user }, { new: true });
        res.json({ status: 'user update' });


    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        })

    }


}

module.exports = userController;