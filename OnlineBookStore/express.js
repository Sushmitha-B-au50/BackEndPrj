const bodyParser = require('body-parser');
const booksRoutes = require('./RestApi/Routes/books');
const userRoutes = require('./RestApi/Routes/users');
const orderRoutes = require('./RestApi/Routes/orders');
const express =  require ('express');
var session = require('express-session');
const flash = require('connect-flash');
const { Cookie } = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books',booksRoutes);
app.use('/user',userRoutes);
app.use('/order',orderRoutes);
app.use(express.static('Front-End'));
app.use(session({
    secret:'secret',
    Cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(cookieParser());


app.get('/', (req, res,next) => {
    res.sendFile(__dirname + "/Front-End/home.html", (err) => {
        if(err){
            console.log("Error while loading online book store page", err)
        }
    })
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/Front-End/signup.html",{message:req.flash('message')}, (err) => {
        if(err){
            console.log("Error while loading signup page", err)
        }
    })
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/Front-End/login.html", (err) => {
        if(err){
         
            console.log("Error while loading login page", err)
        }
  
    })
})
app.get('/user/login', (req, res) => {
    res.sendFile(__dirname + "/", (err) => {
        if(err){
         
            console.log("Error while loading login page", err)
        }
    })
})

app.get('/cart', (req, res) => {
    res.sendFile(__dirname + "/Front-End/cart.html", (err) => {
        if(err){
         
            console.log("Error while loading cart page", err)
        }
    })
})


app.listen(8000, () => {
    console.log("Listening on the port 8000");
})