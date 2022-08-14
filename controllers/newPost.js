module.exports = (req, res) =>{
    if(req.session._id){
        return res.render("create");
    }
    res.redirect('/auth/login')
}