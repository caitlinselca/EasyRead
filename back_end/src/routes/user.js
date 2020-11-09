require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');


// Register
router.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        };
        const result = await User.create(user);
        if(result == 'saved') return res.sendStatus(201);
        else if(result == 'exists') return res.sendStatus(403);
    }catch(err){
        return res.statusStatus(400);
    }
});

// Login
router.post('/login', verifyUser, (req, res) => { 
    const user = {username: req.body.username};
    const accessToken = createAccessToken(user); 
    return res.status(200).json({accessToken: accessToken}); 
});

// Checks whether user is logged in and if user is new
router.get('/islogin', authenticateAccessToken, (req, res) => {
    if(req.user.genres.length == 0) return res.status(200).send('new');
    else return res.status(200).send('old');
})

// Saving genres
router.post('/savegenres', authenticateAccessToken, async (req, res) => {
    try{
        await User.findOneAndUpdate(
            {username: req.user.username},
            {$set: {genres: req.body.trueGenres}},
            {new: true}
        );
        return res.status(200).send('Saved');
    }catch(err){
        return res.status(400).send(err);
    }
})

router.get('/getgenres',authenticateAccessToken, async(req, res) => {
    try{
        let genres = [];
        await User.findOne({username: req.user.username}, (err, user) => {
            genres = user.genres;
            console.log(genres);
        });
        return res.status(200).send(genres);
    }catch(err){
        return res.status(400).send(err);
    }
})

async function verifyUser(req, res, next){ 
    const user = await User.findOne({username: req.body.username});
    if(user == null) return res.status(400).send('Wrong username or password.');

    const result = await bcrypt.compare(req.body.password, user.password); 
    if(result) next(); 
    else return res.status(400).send('Wrong username or password.'); 
}

function createAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h'}); 
}

function authenticateAccessToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.sendStatus(400);
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
        if(err) return res.sendStatus(403);

        const usernameExist = await User.findOne({username: user.username});
        if(usernameExist == null) return res.sendStatus(400);

        else req.user = usernameExist;
        return next();
    });
}

module.exports = router;