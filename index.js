const express = require('express')
const app = express()
/*const path = require('path')*/

app.use(express.static('public'))
app.listen(3000,()=>{
    console.log("App listening on port 3000")
})
const ejs = require('ejs')
app.set('view engine','ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

/* Chp11 user authentication */
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))

/*const BlogPost = require('./models/BlogPost.js')*/

/*chp8 middleware*/
/*const validateMiddleWare = (req,res,next)=>{
    if(req.body.title==""||req.body.body==""){
        return res.redirect('/posts/new')
    }
    next()
}*/

const fileUpload = require('express-fileupload')
app.use(fileUpload())
const validateMiddleware = require("./middleware/validateMiddleware.js") /*newly added in Chp9*/
app.use('/posts/store', validateMiddleware)
/*chp8 middleware*/

const authMiddleware = require('./middleware/authMiddleware')
const rifAM = require('./middleware/redirectIfAuthenticatedMiddleware')

/*app.get('/',async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{blogposts});
})*/
const homeController = require('./controllers/home')
app.get('/',homeController)

/*app.get('/posts/new',(req,res)=>{res.render('create')})*/
const newPostController = require('./controllers/newPost')
/*app.get('/posts/new',newPostController)*/ 
app.get('/posts/new',authMiddleware, newPostController) /*changed in Chp11*/

/*app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{blogpost})
})*/
const getPostController = require('./controllers/getPost')
app.get('/post/:id',getPostController)

/*app.post('/posts/store', async (req,res)=>{
    await BlogPost.create(req.body)
    res.redirect('/')
})*/
const storePostController = require('./controllers/storePost')
app.post('/posts/store', authMiddleware, storePostController)


const newUserController = require('./controllers/newUser')
app.get('/auth/register', rifAM, newUserController)

const storeUserController = require('./controllers/storeUser')
app.post('/users/register', rifAM, storeUserController)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
/*mongoose.connect('mongodb+srv://User1:user1@cluster0.wwbywpb.mongodb.net/my_database', {useNewUrlParser: true});*/

const loginController = require('./controllers/login')
app.get('/auth/login', rifAM, loginController)

const loginUserController = require('./controllers/loginUser')
app.post('/users/login', rifAM, loginUserController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout', logoutController)