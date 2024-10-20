import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from URL parameters
  const [title, setTitle] = useState(''); // State for recipe title
  const [ingredients, setIngredients] = useState(''); // State for ingredients
  const [instructions, setInstructions] = useState(''); // State for instructions
  const [image, setImage] = useState(''); // State for image URL
  const navigate = useNavigate(); // Navigation hook

  // Fetch the recipe details when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); // Get recipe data by ID
        setTitle(data.title);
        setIngredients(data.ingredients.join(', ')); // Join ingredients for input display
        setInstructions(data.instructions);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching recipe:', error); // Log error if fetching fails
      }
    };

    fetchRecipe(); // Call the fetch function
  }, [id]); // Dependency on ID so it re-runs when ID changes

  // Handle form submission to update the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      title,
      ingredients: ingredients.split(',').map((ing) => ing.trim()), // Split ingredients into an array
      instructions,
      image,
    };

    try {
      await updateRecipe(id, updatedRecipe); // Update recipe via API
      navigate(`/recipes/${id}`); // Redirect to the recipe details page after update
    } catch (error) {
      console.error('Error updating recipe:', error); // Log error if updating fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition duration-300">
      <div className="max-w-md mx-auto p-6">
        <ThemeToggle /> {/* Theme toggle component */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">Edit Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
          <div>
            <label className="block font-semibold">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>
          </div>
          <div>
            <label className="block font-semibold">
              Ingredients (comma-separated):
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>
          </div>
          <div>
            <label className="block font-semibold">
              Instructions:
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>
          </div>
          <div>
            <label className="block font-semibold">
              Image URL (optional):
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
