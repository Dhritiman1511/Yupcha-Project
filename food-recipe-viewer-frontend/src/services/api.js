import axios from 'axios';

// Base URL for the recipes API
const API_URL = 'http://localhost:5000/recipes'; // Adjust if needed

// Fetch all recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the array of recipes
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Rethrow for error handling
  }
};

// Fetch a single recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the recipe object
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error; // Rethrow for error handling
  }
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    const response = await axios.post(API_URL, recipeData);
    return response.data; // Return the created recipe object
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error; // Rethrow for error handling
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedRecipe);
    return response.data; // Return the updated recipe object
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error; // Rethrow for error handling
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Return response confirming deletion
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error; // Rethrow for error handling
  }
};
