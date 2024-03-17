# Exercise Tracker

A RESTful API to keep track of your exercises, built with Node.js, Express, and MongoDB. This project is part of the freeCodeCamp back-end development certification.

### [Exercise Tracker - Live Demo](https://exercisetracker-asns.onrender.com/)
*you may have to wait about 30-50 seconds if the page does not load (due to the hosting service).

## Features

- Create new users and manage them.
- Add exercises to any user.
- Retrieve a user's exercise log with optional filtering by date and pagination.

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- CORS for cross-origin allowance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm
- MongoDB

### Installing

A step by step series of examples that tell you how to get a development env running:

1. Clone the repository: 
    
    `git clone https://github.com/TomasLaus/exercisetracker.git`


2. Install NPM packages:

    `cd exercisetracker`

    `npm install`

3. Start the server:

    `npm start`

4. Set up environment variables: Create a .env file in the root directory and add your

    `MONGO_URI="connection string"`

The server will start running on `http://localhost:3000`.

## Usage

### Creating a New User

- **URL:** `/api/users`
- **Method:** `POST`
- **Body Parameters:** `username=[string]`
- **Success Response:** A JSON object containing the username and a generated `_id`.

### Adding Exercises

- **URL:** `/api/users/:_id/exercises`
- **Method:** `POST`
- **URL Parameters:** `_id=[MongoDB User ID]`
- **Body Parameters:** `description=[string], duration=[integer], date=[date] (optional)`
- **Success Response:** A JSON object with the user's `_id`, username, and exercise details.

### Getting User's Exercise Log

- **URL:** `/api/users/:_id/logs`
- **Method:** `GET`
- **URL Parameters:** `_id=[MongoDB User ID]`
- **Optional Query Parameters:** `from=[date], to=[date], limit=[integer]`
- **Success Response:** A JSON object with a count of all exercises and an array of exercise logs.

## Contributing

Please feel free to fork this repository, make changes, and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
