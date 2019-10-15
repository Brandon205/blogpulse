const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
    db.post.findAll().then(function(posts) {
        res.render('posts/index');
    });
});

router.get('/new', function(req, res) {
    res.render('posts/new.ejs');
});

router.get('/:id', function(req, res) {
    db.post.findByPk(parseInt(req.params.id))
    .then(function(post) {
        post.getAuthor().then(function(author) {
            res.render('posts/show', { post, author });
        })
    });
});

router.post('/', function(req, res) {
    
});

module.exports = router;