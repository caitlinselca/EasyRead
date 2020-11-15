require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const utils = require('./utils')
const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://openlibrary.org/authors/OL1A.json')
        .then(response => response.json())
        .then(data => {
            res.json(data.name);
        })
        .catch(err => res.json(err));
});

router.post('/genres', utils.authenticateAccessToken, async (req, res) => {
    const userGenres = req.user.genres;
    const userThemes = req.user.themes;
    
    let finalOP = [];

    for(let genre of userGenres){
        await fetch(`http://openlibrary.org/subjects/${genre.toLowerCase()}.json?limit=${req.body.amount}`)
            .then(response => response.json())
            .then(data => {
                finalOP = finalOP.concat(data.works);
            })
            .catch(err => res.json(err));  
    }

    finalOP = finalOP.map(book => ({
        title: book.title,
        author: book.authors[0].name,
        cover: book.cover_id,
        themes: book.subject
    }));
    
    // Eliminate duplicates
    finalOP = Array.from(new Set(finalOP));
    
    finalOP = finalOP.filter(book => {
        for(let theme of userThemes){
            if(utils.containsTheme(book, theme)) return true;
        }
        return false;
    });

    res.json({
        selectedGenres: userGenres,
        books: finalOP
    });
    
})

module.exports = router;