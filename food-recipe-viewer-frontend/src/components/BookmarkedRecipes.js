import React, { useEffect, useState } from "react";
import { getRecipes, deleteRecipe, updateRecipe } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const BookmarkedRecipes = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]); // State for bookmarked recipes
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetch bookmarked recipes on component mount
    const fetchBookmarkedRecipes = async () => {
      try {
        const data = await getRecipes();
        // Filter recipes that are bookmarked
        const bookmarked = data.filter((recipe) => recipe.bookmarked);
        setBookmarkedRecipes(bookmarked);
      } catch (error) {
        console.error("Error fetching bookmarked recipes:", error);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  // Navigate to recipe detail view
  const handleView = (id) => {
    navigate(`/recipes/${id}`);
  };

  // Handle recipe deletion
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id); // Call API to delete the recipe
      // Update the state to remove the deleted recipe
      setBookmarkedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Toggle bookmark status for a recipe
  const handleBookmarkToggle = async (id, currentBookmarkStatus) => {
    try {
      console.log(
        "Toggling bookmark for recipe ID:",
        id,
        "Current status:",
        currentBookmarkStatus
      );

      const updatedRecipe = await updateRecipe(id, {
        bookmarked: currentBookmarkStatus,
      });
      console.log("API response:", updatedRecipe);

      // Update state if the API call was successful
      setBookmarkedRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === updatedRecipe.id
            ? { ...recipe, bookmarked: updatedRecipe.bookmarked }
            : recipe
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition duration-300">
      <div className="p-6 max-w-screen-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <ThemeToggle /> {/* Theme toggle component */}
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Your Bookmarks
        </h1>
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
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No bookmarked recipes found
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedRecipes;
