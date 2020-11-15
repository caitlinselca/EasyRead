const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

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

function containsTheme(book, theme){
    for(let t of book.themes){
        if(t.toLowerCase().includes(theme.toLowerCase())) return true;
    }
    return false;
}

module.exports = {
    verifyUser,
    createAccessToken,
    authenticateAccessToken,
    containsTheme
}