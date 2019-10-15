const express = require("express");
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res) { //GET /authors (show all)
    db.author.findAll()
    .then(function(authors) {
        res.render('authors/authors.ejs', { authors });
    });
});

router.get('/new', function(req, res) {
    res.render('authors/new.ejs');
});

// router.get('/:id', function(req, res) {
//     db.author.findByPk(parseInt(req.params.id)).then(function(author) {
//         author.getPosts().then(function(posts) {
//             post.getComments().then(function(comments) {
//                 res.render('authors/show', {author, posts, comments}); 
//             });
//         });
//     });
// });
router.get('/:id', function(req, res) {
    db.author.findByPk(parseInt(req.params.id)).then(function(author) {
        author.getPosts().then(function(posts) {
            res.render('authors/show', {author, posts}); // relates to ^^^^^
        });
    });
});

router.post('/:id/posts', function(req, res) {
    db.author.findByPk(parseInt(req.params.id)).then(function(author) {
        author.createPost(req.body).then(function(post) {
            res.redirect(`/authors/${author.id}`)
        });
    });
});

router.post('/', function(req, res) {
    db.author.create(req.body) // Because they are named the same in the form and in the model
    .then(function() {
        res.redirect('/authors');
    });
});

module.exports = router;