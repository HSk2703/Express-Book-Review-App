const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const public_users = express.Router();

// Import the local books database
const books = require("./booksdb.js");

// Simulate fetching books from an external source with Axios
const fetchBooksFromExternalSource = async () => {
    try {
        // Simulate a delay for the external API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Return the local books database as the external data
        return books;
    } catch (error) {
        console.error('Error fetching books from external source:', error);
        throw error;
    }
};

// Simulate fetching books by author from an external source
const fetchBooksByAuthorFromExternalSource = async (author) => {
    try {
        // Simulate a delay for the external API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Filter books by the given author
        const booksByAuthor = Object.values(books).filter(book => book.author === author);
        return booksByAuthor;
    } catch (error) {
        console.error('Error fetching books by author from external source:', error);
        throw error;
    }
};

// Simulate fetching books by title from an external source
const fetchBooksByTitleFromExternalSource = async (title) => {
    try {
        // Simulate a delay for the external API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Find book by the given title
        const foundBook = Object.values(books).find(book => book.title.toLowerCase() === title.toLowerCase());
        return foundBook;
    } catch (error) {
        console.error('Error fetching books by title from external source:', error);
        throw error;
    }
};

// Route for getting the list of books available in the shop using async-await
public_users.get('/books', async (req, res) => {
    try {
        const booksData = await fetchBooksFromExternalSource(); // Fetch books using async-await
        res.status(200).json(booksData); // Return the books data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Route for getting book details based on ISBN using async-await
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        // Simulate a delay for fetching book details
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (books[isbn]) {
            res.status(200).json(books[isbn]); // Return book details if found
        } else {
            res.status(404).json({ message: "Book not found" }); // Return error if book not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book details', error: error.message });
    }
});

// Route for getting book details based on author using async-await
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const booksByAuthor = await fetchBooksByAuthorFromExternalSource(author); // Fetch books by author using async-await
        if (booksByAuthor.length > 0) {
            res.status(200).json(booksByAuthor); // Return books by the author
        } else {
            res.status(404).json({ message: "No books found by this author" }); // Return error if no books found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books by author', error: error.message });
    }
});

// Route for getting all books based on title using async-await
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const foundBook = await fetchBooksByTitleFromExternalSource(title); // Fetch books by title using async-await
        if (foundBook) {
            res.status(200).json(foundBook); // Return book details if found
        } else {
            res.status(404).json({ message: "Book not found" }); // Return error if book not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books by title', error: error.message });
    }
});

// Route for getting book reviews based on ISBN
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json(books[isbn].reviews); // Return reviews for the book
    } else {
        res.status(404).json({ message: "Book not found" }); // Return error if book not found
    }
});

module.exports.general = public_users;
