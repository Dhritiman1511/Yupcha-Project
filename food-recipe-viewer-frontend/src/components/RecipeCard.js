  import React from "react";
  import { TrashIcon, BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline';

  const RecipeCard = ({ recipe, onView, onDelete, onBookmark }) => {
    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : recipe.ingredients
      ? recipe.ingredients.slice(1, -1).split(", ")
      : [];

    // Placeholder image in case the image fails to load
    const placeholderImage = "https://via.placeholder.com/300";

    return (
      <div
        onClick={() => onView(recipe.id)}
        className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
      >
        <div className="p-4">
          <h2 className="font-bold text-lg mb-2 text-gray-900">{recipe.title}</h2>
          <p className="text-gray-600 mb-2">{ingredients.join(", ")}</p>
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              onError={(e) => (e.target.src = placeholderImage)}
              className="w-full h-48 object-cover"
            />
          ) : (
            <img
              src={placeholderImage}
              alt="Default"
              className="w-full h-48 object-cover"
            />
          )}

          <div className="flex justify-between mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                onDelete(recipe.id);
              }}
              className="text-red-500 hover:text-red-600"
            >
              <TrashIcon className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                onBookmark(recipe.id, !recipe.bookmarked); // Toggle bookmarked state
              }}
              className="text-yellow-500 hover:text-yellow-600"
            >
              {recipe.bookmarked ? (
                <BookmarkSlashIcon className="h-6 w-6" />
              ) : (
                <BookmarkIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default RecipeCard;
