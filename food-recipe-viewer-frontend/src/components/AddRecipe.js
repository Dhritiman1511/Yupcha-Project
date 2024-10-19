import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipe({ 
                title, 
                ingredients: ingredients.split(',').map(ing => ing.trim()), 
                instructions, 
                image 
            });
            navigate('/'); // Redirect to the home page or recipes list after adding
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition duration-300 pt-10">
            <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ">
                <ThemeToggle />
                <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
                        <input
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Instructions</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200 w-full"
                    >
                        Add Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
