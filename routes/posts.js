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
        post.getComments().then(function(comments) {
            res.render('posts/show', { post,  comments })
        }).catch(err=>console.log(err));
    });
});

router.post('/:id', function(req, res) {
    db.post.findByPk(parseInt(req.params.id)).then(function(post) {
        post.createComment(req.body).then(function(comment) {
            res.redirect(`/posts/${req.params.id}`);
        })
    })
});

module.exports = router;