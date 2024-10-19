import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const BookmarkedRecipes = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      try {
        const data = await getRecipes();
        // Filter recipes that are bookmarked
        const bookmarked = data.filter(recipe => recipe.bookmarked);
        setBookmarkedRecipes(bookmarked);
      } catch (error) {
        console.error('Error fetching bookmarked recipes:', error);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  const handleView = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleDelete = (id) => {
    // Implement the delete functionality here if needed
  };

  const handleBookmarkToggle = (id, currentBookmarkStatus) => {
    // Implement the bookmark toggle functionality here if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition duration-300">
      <div className="p-6 max-w-screen-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <ThemeToggle />
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">Your Bookmarks</h1>
        {bookmarkedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onView={handleView} 
                onDelete={handleDelete} 
                onBookmark={handleBookmarkToggle} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">No bookmarked recipes found</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedRecipes;
