const express = require('express');
const app = express();
// const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');
const db = require('./database/database.js');
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});
app.get('/books', (req, res) => {
	res.render('books');
});

app.listen(PORT, () => console.log(`It is alive on port ${PORT}`));
