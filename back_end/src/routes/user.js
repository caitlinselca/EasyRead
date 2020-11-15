require('dotenv/config');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const utils = require('./utils')


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
router.post('/login', utils.verifyUser, (req, res) => { 
    const user = {username: req.body.username};
    const accessToken = utils.createAccessToken(user); 
    return res.status(200).json({accessToken: accessToken}); 
});

// Checks whether user is logged in and if user is new
router.get('/islogin', utils.authenticateAccessToken, (req, res) => {
    if(req.user.genres.length == 0) return res.status(200).send('new');
    else return res.status(200).send('old');
})

// Saving genres
router.post('/savegenres', utils.authenticateAccessToken, async (req, res) => {
    try{
        const data = {
            username: req.user.username,
            genres: req.body.trueGenres
        }
        await User.saveGenres(data);
        return res.status(200).send('Saved');
    }catch(err){
        return res.status(400).send(err);
    }
})

router.get('/getgenres', utils.authenticateAccessToken, (req, res) => {
        const genres = req.user.genres;
        return res.status(200).send(genres);
})

// Saving themes
router.post('/savethemes', utils.authenticateAccessToken, async (req, res) => {
    try{
        const data = {
            username: req.user.username,
            themes: req.body.themes
        }
        await User.saveThemes(data);
        return res.status(200).send('Saved');
    }catch(err){
        return res.status(400).send(err);
    }
})

router.get('/getthemes', utils.authenticateAccessToken, (req, res) => {
        const themes = req.user.themes;
        return res.status(200).send(themes);
})

module.exports = router;