const express = require("express");
const passport = require('passport');
const jwt = require("jsonwebtoken");
const createApiResponse = require("../helper/createApiResponse");
const { CLIENT_URL, SECRET } = require('../helper/config');
const { User } = require('../model/User');

const router = express.Router();

router.get('/login/success', async (req, res) => {
    if (req.user) {
        const user = await User.findOne({ email: req.user.emails[0].value });

        if (!user) {
            return res.json(createApiResponse(false, null, "User not found.", 401))
        }

        if (user.isVerify === false) {
            return res.json(createApiResponse(false, null, "Email is not verified", 401))
        }

        const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
            expiresIn: "48h",
        });

        res.json(createApiResponse(true, { token: token }, "login successfully.", 200))
    } else {
        res.json(createApiResponse(false, [], "Not Authorized", 404))
    }
})

router.get('/login/failed', (req, res) => {
    res.json(createApiResponse(false, [], "Log in failure", 401))
})

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(CLIENT_URL)
})

module.exports = router;