const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const { createRecipeTable } = require('./models/Recipe');
const recipeRoutes = require('./routes/recipes');

// Initialize dotenv to use environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors()); // Add CORS middleware here

// Call the function to create the recipes table
createRecipeTable();

// Routes
app.use('/recipes', recipeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Recipe Viewer API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
