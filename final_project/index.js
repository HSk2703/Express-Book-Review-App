const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session middleware globally
app.use(session({
    secret: 'fingerprint_customer', // Secret key for signing cookies
    resave: true, // Save session even if not modified
    saveUninitialized: true // Save uninitialized sessions
}));

// Use the routes for customer-related operations
app.use("/customer", customer_routes);

// Use general routes
app.use("/", genl_routes);

const PORT = 5000;

// Start the server
app.listen(PORT, () => console.log("Server is running on port", PORT));
