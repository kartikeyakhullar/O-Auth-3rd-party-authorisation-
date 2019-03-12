const express = require('express')
const router = express.Router()
const passport = require('passport')


// auth login
router.get('/login',(req,res)=>{
    res.render('login', { user : req.user })
})


// auth logout
router.get('/logout',(req,res)=>{
    // res.send('logging out')
    // handle with passport
    req.logOut()
    res.redirect('/')
})


// auth with google
router.get('/google',passport.authenticate('google',{
    scope : ['profile']
}))

// To handle redirects after google authorisation.
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    // res.send(req.user)
    res.redirect('/profile')
})




module.exports = router