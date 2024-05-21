const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'list.db'), (err) => {
	if (err) {
		console.error('Error opening database:', err.message);
	} else {
		console.log('Connected to the SQLite database.');
	}
});

db.serialize(() => {
	db.run(
		`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      volumes INTEGER NOT NULL,
      status TEXT NOT NULL
    )
  `,
		(err) => {
			if (err) {
				console.error('Error creating table:', err.message);
			} else {
				console.log('Table created or already exists.');
			}
		},
	);
});

// Function to add a new book
const addBook = (title, volumes, status, callback) => {
	db.run('INSERT INTO books (title, volumes, status) VALUES (?, ?, ?)', [title, volumes, status], function (err) {
		callback(err, this ? this.lastID : null);
	});
};

// Function to get all books
const getAllBooks = (callback) => {
	db.all('SELECT * FROM books', [], (err, rows) => {
		callback(err, rows);
	});
};

// Function to get a specific book by id
const getBookById = (id, callback) => {
	db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
		callback(err, row);
	});
};

// Function to update a book by id
const updateBookById = (id, title, volumes, status, callback) => {
	db.run(
		'UPDATE books SET title = ?, volumes = ?, status = ? WHERE id = ?',
		[title, volumes, status, id],
		function (err) {
			callback(err, this ? this.changes : null);
		},
	);
};

// Function to delete a book by id
const deleteBookById = (id, callback) => {
	db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
		callback(err, this ? this.changes : null);
	});
};

module.exports = {
	addBook,
	getAllBooks,
	getBookById,
	updateBookById,
	deleteBookById,
};
