const jwt = require("jsonwebtoken")

const middlewareController = {
    // Verify token
    verifyToken: (req, res, next) => {
        const accessTokenSession = req.session.accessToken;
        const refreshTokenSession = req.session.refreshToken;
        if (accessTokenSession && refreshTokenSession) {
            //Bearer 
            jwt.verify(accessTokenSession, "ahuhu", (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            })
        } else {
            req.flash('error_msg', 'Please login to view inside resource');
            res.redirect('/login');
        }
    }
}

module.exports = middlewareController