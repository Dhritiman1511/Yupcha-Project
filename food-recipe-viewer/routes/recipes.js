const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /recipes - Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /recipes/:id - Fetch a single recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /recipes - Create a new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO recipes (title, ingredients, instructions, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, ingredients, instructions, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /recipes/:id - Update an existing recipe by ID
// PUT /recipes/:id - Update an existing recipe by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, image, bookmarked } = req.body; // Include 'bookmarked'

  // Validate input data
  if (typeof bookmarked !== 'undefined' && typeof bookmarked !== 'boolean') {
    return res.status(400).json({ error: 'Invalid value for bookmarked. It should be a boolean.' });
  }

  // Prepare the query parameters based on which fields are provided
  const updates = [];
  const params = [];

  if (title) {
    updates.push('title = $' + (updates.length + 1));
    params.push(title);
  }
  if (ingredients) {
    updates.push('ingredients = $' + (updates.length + 1));
    params.push(ingredients);
  }
  if (instructions) {
    updates.push('instructions = $' + (updates.length + 1));
    params.push(instructions);
  }
  if (image) {
    updates.push('image = $' + (updates.length + 1));
    params.push(image);
  }
  if (typeof bookmarked !== 'undefined') { // Check if bookmarked is provided
    updates.push('bookmarked = $' + (updates.length + 1));
    params.push(bookmarked);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  params.push(id); // Append the ID at the end for the WHERE clause

  try {
    const result = await pool.query(
      'UPDATE recipes SET ' + updates.join(', ') + ', updated_at = NOW() WHERE id = $' + (params.length) + ' RETURNING *',
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /recipes/:id - Delete a recipe by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
