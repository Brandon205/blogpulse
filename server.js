require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const override = require('method-override');


const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(override('_method'));

app.get('/', function(req, res) {
    res.render('home.ejs');
});

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));

app.listen(process.env.POST | 3000);