const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports =async (req, res) => {
    await BlogPost.create({
        ...req.body,
        userid: req.session._id
    })
    res.redirect('/');
}