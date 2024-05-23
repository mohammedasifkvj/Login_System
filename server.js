const bodyParser = require('body-parser');
const express=require('express');
const path=require('path')
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const nocache = require('nocache');

const router=require('./router')

const app=express();

const port=process.env.PORT ||8001;
app.set('view engine','ejs');

 
app.use(bodyParser.json());  //responsible for passing incomig req to middleware
app.use(bodyParser.urlencoded({extetended:true}));  //serialise date using this middleware
app.use(nocache());


// Load ststic assets
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


//session management
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router)

//home route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else{
    res.render('base',{titl:'Login System'});
    }
});

app.listen(port,()=>console.log('Listening to the server on http://localhost:8001'));



//----------------------------------------------------------------------------------------------------------

// app.use(session({
//     secret:uuidv4(),
//     resave:'false',
//     saveUninitialized:true
// }));
