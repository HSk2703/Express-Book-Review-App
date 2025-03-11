# Express Book Review App

The **Express Book Review App** is a web application that allows users to browse, review, and rate books. Built using **Express.js**, this application provides an intuitive platform for book lovers to share their thoughts and discover new books.

## Features

- **User Authentication** – Register and log in to post reviews.
- **Book Listing** – View a collection of books with details.
- **Review & Ratings** – Users can write reviews and rate books.
- **REST API** – Well-structured API endpoints for data management.
- **Responsive UI** – Optimized for both desktop and mobile devices.

## Technologies Used

- **Express.js** – Backend framework for handling API requests.
- **MongoDB** – Database for storing book and user data.
- **Mongoose** – ODM for MongoDB interactions.
- **Node.js** – JavaScript runtime environment.
- **JWT Authentication** – Secure user authentication.
- **Bootstrap/CSS** – Frontend styling for a user-friendly interface.

## Project Structure

```
Express-Book-Review-App/
├── models/            # Database models
├── routes/            # API routes
├── views/             # Frontend templates
├── public/            # Static assets (CSS, JS, images)
├── app.js             # Main server file
├── config/            # Configuration files (DB, authentication)
├── package.json       # Project dependencies
├── README.md          # Project documentation
```

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/HSk2703/Express-Book-Review-App.git
cd Express-Book-Review-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the necessary environment variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server

```bash
npm start
```

### 5. Access the Application

Open your browser and navigate to:

👉 [http://localhost:5000/](http://localhost:5000/)

## API Endpoints

| Method | Endpoint              | Description               |
|--------|----------------------|---------------------------|
| GET    | `/books`             | Get all books             |
| POST   | `/books`             | Add a new book            |
| GET    | `/books/:id`         | Get details of a book     |
| POST   | `/reviews/:bookId`   | Add a review for a book   |
| GET    | `/reviews/:bookId`   | Get reviews for a book    |

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes** with a clear message.
4. **Push your changes** to your forked repository.
5. **Submit a pull request** with details of your changes.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

