import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import BookmarkedRecipes from './components/BookmarkedRecipes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/recipes/edit/:id" element={<EditRecipe />} />
          <Route path="/bookmarked-recipes" element={<BookmarkedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
