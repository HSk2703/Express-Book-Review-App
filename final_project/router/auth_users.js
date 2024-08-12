const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js'); // Import the books database
const regd_users = express.Router();

// Initialize an empty array for users
let users = [];

// Function to check if the username already exists
const isValid = (username) => {
    return users.some(user => user.username === username);
};

// Function to authenticate user by username and password
const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

// Route for registering a new user
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (isValid(username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Add the new user to the users array
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
});

// Route for logging in a user
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Authenticate the user
    const isAuthenticated = authenticatedUser(username, password);

    // If authentication is successful
    if (isAuthenticated) {
        // Generate JWT access token
        let accessToken = jwt.sign({ username: username }, 'your_jwt_secret_key', { expiresIn: '1h' });
        req.session.username = username; // Save username in session

        return res.status(200).json({ message: "User successfully logged in", token: accessToken });
    } else {
        // If authentication fails
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});

// Route for adding or modifying a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn; // Extract the ISBN from the URL
    const { review } = req.body; // Review should be extracted from request body
    const username = req.session.username; // Username from the session

    // Debugging output
    console.log("ISBN: ", isbn); // Should print the ISBN you're testing with
    console.log("Review: ", review); // Should print the review passed
    console.log("Username: ", username); // Should print the logged-in username

    // Check if both ISBN and review are provided
    if (!isbn || !review) {
        return res.status(400).json({ message: "ISBN and review are required" });
    }

    // Check if the user is logged in
    if (!username) {
        return res.status(401).json({ message: "User must be logged in to add a review" });
    }

    // Check if the book exists in the database
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Initialize reviews object if it does not exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Add or update the review
    books[isbn].reviews[username] = review;

    res.status(200).json({ message: "Review added/updated successfully" });
});

// Route for deleting a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn; // Extract the ISBN from the URL
    const username = req.session.username; // Username from the session

    // Check if ISBN is provided
    if (!isbn) {
        return res.status(400).json({ message: "ISBN is required" });
    }

    // Check if the user is logged in
    if (!username) {
        return res.status(401).json({ message: "User must be logged in to delete a review" });
    }

    // Check if the book exists in the database
    if (!books[isbn] || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "No review found for this user" });
    }

    // Delete the user's review
    delete books[isbn].reviews[username];

    res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
