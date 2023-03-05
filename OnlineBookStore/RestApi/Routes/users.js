const express =  require ('express');
const router  = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User =  require('../models/user');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const session = require('express-session');
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

router.get('/',async(req,res,next)=> {
    try{
        const result = await User.find();     
        res.send(result);
        }
        catch{
            res.send('Error' + err);
        }
});
router.post('/login',async(req,res,next)=> {
    try{
          
        let user_password = req.body.Password.toString();
        let user_email = req.body.Email;
        const user_data = await User.findOne({Email: user_email})
        if(!user_data){
           res.status(400);
           res.send("User doesn't exist"); 
        }
        let db_password = user_data.Password;

        //matching password
        const isValid = await bcrypt.compare(user_password, db_password);

        //taking action for incorrect password
        if(!isValid){
            res.status(400)
            return res.send("Incorrect Password")
        }
        //generate token
        const token_to_send = jwt.sign({id: user_data.Name}, "mySecretKey", { expiresIn: '5s'})
        res.cookie('my_token', token_to_send);
        res.cookie('UserName', user_data.Name);
        res.status(200);
        res.redirect('/');
        }
        catch(err){
            res.send('Error' + err);
        }
});

router.post('/logout', (req, res) => {
        res.clearCookie('my_token')
})

router.post('/',async(req,res,next)=> {
    let user_name = req.body.Name;
    let user_email = req.body.Email;
    let user_password = req.body.Password.toString();

    const user_data = await User.findOne({Email: user_email})
    if(user_data){
    //   req.flash('message' ,'User already exists');
    //   req.flash('message', 'User already exists');     
       return res.send("User already exists");
    }
    const salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(user_password, salt)
    const data_to_store = new User({Name: user_name, Email: user_email, Password: hashed_password})
    await data_to_store.save().then(result => {
        return res.send("SignUp Successfull");
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
});


module.exports = router;