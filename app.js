const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
const MongoDBStore = require('express-mongodb-session')(session);
const usersRoutes = require('./routes/users');
const questionnaryRoutes = require('./routes/questionnary');
const {creatInitialAdmin,createQuestionNumberVariable,createTimeoutVariable, successNote} = require('./functions');

const app = express();
require('dotenv').config()

let sessionMaxAge = 800000
 

const store = new MongoDBStore({
    uri: 'mongodb://'+process.env.DATABASE_URL+process.env.DATABASE_NAME,
    collection: 'mySessions'
});
 
// Catch errors
store.on('error', function(error) {
    console.log(error);
});


app.set('trust proxy', 1) // trust first proxy
const sessionMiddleware = session({
    secret: process.env.SESSIONS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie: {
        //secure: true,
        maxAge: sessionMaxAge,
        httpOnly : false
    }
})
app.use(sessionMiddleware);


 
mongoose.connect('mongodb://'+process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME 
})
.then(() => {
    console.log('Connexion à MongoDB réussie !')
    creatInitialAdmin();
    createQuestionNumberVariable();  
    createTimeoutVariable();
    successNote();
})
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api/questionnary", questionnaryRoutes);

app.use("/", (req, res)=>{
  res.send("Ok")
})




module.exports = app;