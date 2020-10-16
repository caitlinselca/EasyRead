require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/goodReads', (req, res) => {
    fetch('https://www.goodreads.com/search.xml?key=GOA2lmDD9cp7DjyJMUXibg&q=Ender%27s+Game')
        .then(response => response.text())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
});

module.exports = router;