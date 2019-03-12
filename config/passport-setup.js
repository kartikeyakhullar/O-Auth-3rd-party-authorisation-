const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})


passport.use(
    new GoogleStrategy({
        // options for google strategy.
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret,
        callbackURL : '/auth/google/redirect'
    },(accessToken, refreshToken, profile, done)=>{
        // passport callback function.
        // Check if the user exists
        console.log(profile)
        console.log('#####################')
        console.log(profile._json.picture)
        User.findOne({googleId : profile.id}).then((current)=>{
            if(current){
                // Already have the user
                console.log('User is ' + current)
                // console.log('Hit')
                done(null, current)

            }else{
                // Create user in db

                new User({
                    username : profile.displayName,
                    googleId : profile.id,
                    thumbnail : profile._json.picture
                }).save().then((newUser)=>{
                    console.log('New User was created ' + newUser)
                    done(null, newUser)
                })
            }
        })
    })
)