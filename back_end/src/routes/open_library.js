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

router.post('/genres', async (req, res) => {
    
    let finalOP = [];
    
    for(let genre of req.body.trueGenres){
        await fetch(`http://openlibrary.org/subjects/${genre.toLowerCase()}.json?limit=10`)
        .then(response => response.json())
        .then((data) => {
            finalOP.push(data);
            // console.log(finalOP);
        })
        .catch(err => res.json(err));    
    }

    res.json({
        selectedGenres: req.body.trueGenres,
        books: finalOP
    });
    
})

module.exports = router;