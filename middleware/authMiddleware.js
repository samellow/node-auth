const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { response } = require('express')

const requireAuth = (req,res,next) =>{
    const token =  req.cookies.jwt

    //check json web token

    if(token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/login')
    }

}

const checkUser = (req, res, next) =>{
    const token =  req.cookies.jwt

    

    if(token) {
        jwt.verify(token, process.env.SECRET, async(err, decodedToken) => {
            if(err){
                console.log(err)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next()
            }
        })
    }else{
        res.locals.user = null

    }

}

module.exports ={ requireAuth, checkUser }