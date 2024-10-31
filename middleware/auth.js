const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (role) => {

    return ((req, res, next) => {
        try {
            const token = req.session.user_credentials//req.headers.authorization.split(' ')[1];
            //console.log(req.rawHeaders)
            const decodedToken = token//jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            const userId = decodedToken.userId;
            const type = decodedToken.type
            //console.log(role);
            for (let i = 0; i<role.length; i++) {
                //console.log("Type : "+type+" Role : "+role[i]);
                if (type === role[i]) {
                    return next();
                   // break;  
                }
            }
            return res.status(200).json({message : "You dont have permission to perform this action"});
        } catch (error) {
            console.log(req.body)
            return res.status(401).json({message : "You are not logged in"});
        }
    })
}

