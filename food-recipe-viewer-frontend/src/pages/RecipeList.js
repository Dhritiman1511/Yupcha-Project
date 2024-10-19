import React, { useEffect, useState } from "react";
import { getRecipes, deleteRecipe, updateRecipe } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from '../components/ThemeToggle';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleView = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleBookmark = async (id, currentBookmarkStatus) => {
    try {
      const updatedRecipe = { bookmarked: currentBookmarkStatus };
      const response = await updateRecipe(id, updatedRecipe);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id
            ? { ...recipe, bookmarked: response.bookmarked }
            : recipe
        )
      );
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600 dark:text-blue-400">
            <img
              src="../egg_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
              alt="Egg Icon"
              className="inline-block w-16 h-15 mr-2 fill-blue-950 dark:fill-blue-400"
              style={{
                filter:
                  "invert(44%) sepia(100%) saturate(27%) hue-rotate(175deg) brightness(110%) contrast(110%)",
              }}
            />
            RecipU
          </h1>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="relative mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 pl-10 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-200 absolute left-3 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm8 8l4 4"
              />
            </svg>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/recipes/add"
              className="flex items-center bg-blue-600 dark:bg-blue-400 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Recipe
            </Link>
            <Link
              to="/bookmarked-recipes"
              className="flex items-center bg-yellow-500 dark:bg-yellow-400 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 dark:hover:bg-yellow-500 transition duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v18l7-5 7 5V3z"
                />
              </svg>
              Bookmarks
            </Link>
          </div>
        </div>
        
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={handleView}
                onDelete={handleDelete}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
