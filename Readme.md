# Blog API with User Authentication

This is a simple Express-based API for a blog application. It includes user authentication using JWT (JSON Web Tokens) and cookies for session management.

## Features

- User registration, login, and logout
- JWT-based authentication with cookies
- Basic blog post CRUD operations (Create, Read, Update, Delete)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```plaintext
   PORT=3000
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run start
   ```

## API Endpoints

### User Authentication

- **POST** `/api/register`: Register a new user
- **POST** `/api/login`: Login with email and password
- **GET** `/api/logout`: Logout and clear session cookies

### Blog Operations

- **GET** `/api/get-posts`: Get all blog posts
- **GET** `/api/get-post/:id`: Get a single post by ID
- **POST** `/api/create-post`: Create a new post (requires authentication)
- **PUT** `/api/update-post/:id`: Update an existing post (requires authentication)
- **DELETE** `/api/delete-post/:id`: Delete a post (requires authentication)

## Usage

1. Register a new user with `/api/register`.
2. Login to receive a JWT stored in a cookie.
3. Access protected blog routes (e.g., create, update, or delete posts).


