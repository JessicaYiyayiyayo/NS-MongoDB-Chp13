const User = require("../models/User")

module.exports = (req, res, next) => {
    User.findById(req.session._id, (error, user) => {
        if (error || !user){
            return res.redirect('/');
        }
        next();
    });
}