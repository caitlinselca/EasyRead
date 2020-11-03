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
    let genre = req.body.trueGenres[0].toLowerCase();
    fetch(`http://openlibrary.org/subjects/${genre}.json?limit=100`)
        .then(response => response.json())
        .then(data => {
            res.json({
                selectedGenres: req.body.trueGenres,
                books: data
            });
        })
        .catch(err => res.json(err));
})

module.exports = router;