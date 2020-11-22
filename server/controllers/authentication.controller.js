const User= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const authenticationController={};


authenticationController.login = async (req, res) => {
    const {email,password}= req.body;
    try {

        
        const userDB = await User.findOne( {email} );
        console.log(userDB);
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email or password are incorrect'
                }
            });
        }

        if (!bcrypt.compareSync(password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email or password are incorrect'
                }
            });

        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        //console.log(token);


        res.json({
            ok: true,
            user: userDB,
            token
        });


    } catch (err) {
        res.status(500).json({
            ok: false,
            err
        });
    }
}


module.exports= authenticationController;