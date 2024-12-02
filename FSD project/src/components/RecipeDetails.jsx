import React from "react";

const RecipeDetails = ({ recipe, onBack }) => {
  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((key, index) => ({
      ingredient: recipe[key],
      measure: recipe[`strMeasure${key.match(/\d+/)[0]}`],
    }));

  return (
    <div className="details-container">
      <button onClick={onBack} className="btn-back">
        BACK
      </button>
      <h1>{recipe.strMeal}</h1>
      <div className="details-content">
        <div className="image-and-ingredients">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="ingredients">
            <h4>INGREDIENTS</h4>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="instructions">
          <h4>INSTRUCTIONS</h4>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
