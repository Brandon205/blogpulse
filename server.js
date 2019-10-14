require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');


const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }));