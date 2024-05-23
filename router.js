var express=require('express')
var router=express.Router()

const credential={
    email:'user@gmail.com',
    password:'123'
}

//Login  user
router.post('/login',(req,res)=>{
    if (req.body.email==credential.email && req.body.password==credential.password ) {
       req.session.user=req.body.email;
     res.redirect('/route/dashboard');
    //res.end('Login successful')
    }else{
      res.render('base',{log:'Invalid E-mail or Password'})
    }
});

//Route for dashboard
router.get('/dashboard',(req,res)=>{
    if (req.session.user) {
        res.render('dashboard',{ title:'Express Page',user:req.session.user})
    
     }  
});


//Route for Logout
router.get('/logout',(req,res)=>{    //what will happen when we logout
    req.session.destroy(function (err){
      if (err) {
        console.log(err);
        res.send('Error')
      } else {
        res.render('base',{log:'Logout Successfully'})
      }  
    })
})

module.exports=router