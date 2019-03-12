const express = require('express')
const router = require('./routes/auth-routes')
const passpeortSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session') 
const profileRoutes = require('./routes/profile-routes')
const passport = require('passport')
const app = express()



app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys : [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log('Connected to mongodb.')
})

app.use('/auth', router)
app.use('/profile', profileRoutes)



app.get('/',(req,res)=>{
    res.render('home',{user : req.user})
})


app.listen(3000, ()=>{
    console.log('App started on 3000...')
})