const express = require("express")
const router = express.Router()
const User = require('../models/users')
const multer = require('multer')

//imager upload
var storage = multer.diskStorage({
    destination: function(res, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

var upload= multer({
    storage : storage,
}).single('image')

// Insert an user into database route
router.post('/Add', upload, (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        // image: req.file.filename,
    });

    user.save()
    .then(()=>{
        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };
        res.redirect('/')
    })
    .catch(err=>{
        res.json({message: err.message, type: 'danger'});
    })
});

router.get('/', (res, req)=>{
    req.render('index', { title: "Home Page"})
})

router.get('/Add', (req, res)=>{
    res.render("add_user", { title: "Add users"})
})

router.get('/About', (req, res)=>{
    res.render("about", { title: "About"})
})

router.get('/Contact', (req, res)=>{
    res.render("contact", { title: "Contact"})
})


module.exports =router;
