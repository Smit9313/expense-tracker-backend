const express = require("express");
const passport = require('passport');
const createApiResponse = require("../helper/createApiResponse");
const {CLIENT_URL}= require('../helper/config')

const router = express.Router();

router.get('/login/success', (req,res)=>{
    console.log(req.user,"req.user")
    if(req.user) {
        res.json(createApiResponse(true,req.user,"Successfully log in",200))
    }else{
        res.json(createApiResponse(false,[],"Not Authorized",200))
    }
})

router.get('/login/failed', (req,res)=>{
    res.json(createApiResponse(false,[],"Log in failure",401))
})

router.get('/google',passport.authenticate('google',{scope:['email','profile']}))

router.get('/google/callback',passport.authenticate('google',{
    successRedirect:CLIENT_URL,
    failureRedirect:'/login/failed',
}))

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect(CLIENT_URL)
})

module.exports = router;