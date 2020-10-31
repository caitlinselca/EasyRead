require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://openlibrary.org/authors/OL1A.json')
        .then(response => response.json())
        .then(data => {
            res.json(data.name);
        })
        .catch(err => res.json(err));
});

router.post('/genres', (req, res) => {
    res.json(req.body);
})

module.exports = router;