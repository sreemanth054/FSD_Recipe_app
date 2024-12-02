import { useState, useEffect } from "react";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header"; // Import Header Component
import "./App.css";

const searchApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const filterApiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const categoriesApiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]); // List of categories
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const saved = localStorage.getItem("savedRecipes");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState("search");
  const [category, setCategory] = useState(""); // State for category filtering

  const fetchRecipes = async (url) => {
    setIsLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals || []);
    setIsLoading(false);
  };

  const searchRecipes = () => {
    fetchRecipes(searchApiUrl + query);
  };

  const filterByCategory = (category) => {
    setCategory(category);
    fetchRecipes(filterApiUrl + category);
  };

  const fetchCategories = async () => {
    const res = await fetch(categoriesApiUrl);
    const data = await res.json();
    setCategories(data.categories.map((cat) => cat.strCategory)); // Extract category names
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  useEffect(() => {
    if (category) {
      filterByCategory(category);
    } else {
      searchRecipes();
    }
  }, [category]);

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategory(""); // Clear category if searching by query
    searchRecipes();
  };

  const handleSaveRecipe = (recipe) => {
    const alreadySaved = savedRecipes.some((savedRecipe) => savedRecipe.idMeal === recipe.idMeal);
    
    if (!alreadySaved) {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
    }
  };

  const handleRemoveRecipe = (idMeal) => {
    const updatedSavedRecipes = savedRecipes.filter((recipe) => recipe.idMeal !== idMeal);
    setSavedRecipes(updatedSavedRecipes);
  };

  return (
    <div className="container">
      <Header onSearchPage={() => setCategory("")} setCurrentPage={setCurrentPage} /> {/* Header Component */}
      
      {currentPage === "search" && !selectedRecipe ? (
        <>
          <SearchBar
            handleSubmit={handleSubmit}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            isLoading={isLoading}
          />
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => filterByCategory(cat)}
                className={category === cat ? "active" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="recipes">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onSave={() => handleSaveRecipe(recipe)}
                  isSaved={savedRecipes.some(
                    (savedRecipe) => savedRecipe.idMeal === recipe.idMeal
                  )}
                  onShowDetails={() => setSelectedRecipe(recipe)}
                />
              ))
            ) : (
              <p>No Recipes Found !</p>
            )}
          </div>
        </>
      ) : currentPage === "saved" && !selectedRecipe ? (
        <div className="saved-recipes">
          <h2>Saved Recipes</h2>
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onRemove={() => handleRemoveRecipe(recipe.idMeal)}
                isSaved={true}
                onShowDetails={() => setSelectedRecipe(recipe)}
              />
            ))
          ) : (
            <p>No saved recipes yet!</p>
          )}
        </div>
      ) : (
        selectedRecipe && (
          <RecipeDetails recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
        )
      )}
    </div>
  );
}

export default App;