import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(id);
                console.log(data); // Log the fetched recipe data
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleEdit = () => {
        navigate(`/recipes/edit/${id}`);
    };

    // Ensure ingredients is an array
    const ingredients = recipe && Array.isArray(recipe.ingredients) 
        ? recipe.ingredients 
        : recipe && recipe.ingredients ? recipe.ingredients.slice(1, -1).split(', ') : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition duration-300">
            <div className="max-w-screen-lg mx-auto p-6">
                <ThemeToggle />
                {recipe ? (
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">{recipe.title}</h1>
                        {recipe.image && (
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                        <p className="mb-4">{ingredients.join(', ')}</p>
                        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                        <p className="mb-4">{recipe.instructions}</p>
                        <button 
                            onClick={handleEdit} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
                        >
                            Edit Recipe
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;
