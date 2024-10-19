import axios from 'axios';

const API_URL = 'http://localhost:5000/recipes'; // Adjust if needed

export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

// New createRecipe function
export const createRecipe = async (recipeData) => {
  try {
    const response = await axios.post(API_URL, recipeData);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Update the updateRecipe function to handle bookmarking
export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedRecipe);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error); // Detailed logging
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
