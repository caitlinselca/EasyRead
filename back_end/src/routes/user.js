require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');


// Register
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    const usernameExist = await User.findOne({username: req.body.username});

    if(emailExist || usernameExist) return res.status(400).send('User already exists.');

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        await user.save()
        res.status(201).send('Signed up!');
    }catch(err){
        res.status(400).send(err);
    }

});

// Login
router.post('/login', verifyUser, (req, res) => { 
    const user = {username: req.body.username};
    const accessToken = createAccessToken(user); 
    res.json({accessToken: accessToken}); 
});

async function verifyUser(req, res, next){ 
    const user = await User.findOne({username: req.body.username});
    if(user == null) return res.status(400).send('Wrong username or password.');

    const result = await bcrypt.compare(req.body.password, user.password); 
    if(result) next(); 
    else return res.status(400).send('Wrong username or password.'); 
}

function createAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '30s'}); 
}

function authenticateAccessToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) res.sendStatus(400);
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        return next();
    });
}

module.exports = router;