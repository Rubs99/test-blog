const jwt = require('jsonwebtoken');


//=================
// Token verification
//==================

let tokenVerification = (req, res, next) => {

    let token = req.get('token');


    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {

            return res.status(401).json({
                ok: false,
                err :{
                    message: ' token no valido'
                }
            });
        }


        req.user = decoded.user;
        next();
    })



};







module.exports = {

    tokenVerification
}