const pool = require('../config/db');

// Function to create the recipes table
const createRecipeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log('Recipes table created successfully');
  } catch (err) {
    console.error('Error creating recipes table', err);
  }
};

module.exports = { createRecipeTable };