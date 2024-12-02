import React from "react";

const RecipeCard = ({ recipe, onSave, onRemove, isSaved, onShowDetails }) => {
  const { strMeal, strCategory, strMealThumb } = recipe;

  return (
    <div className="card">
      <img src={strMealThumb} alt={strMeal} className="card-image" />
      <div className="card-body">
        <span className="category">{strCategory}</span>
        <h2>{strMeal}</h2>
        <button className="btn-ingredients" onClick={onShowDetails}>
          Recipe
        </button>
        {!isSaved ? (
          <button className="btn-save" onClick={onSave}>
            Save
          </button>
        ) : (
          <button className="btn-remove" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;