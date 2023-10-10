import React from 'react';

const FavoriteRecipe = ({ recipe }) => {
    if (!recipe) {
        return null;
    }

    const { label, image, source, url, ingredients } = recipe;
    console.log(recipe)
    console.log(recipe.recipe.label)

    return (
        <div className="favorite-recipe">
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} alt={label} />
            <p>{source}</p>
            <a href={url} target="_blank" rel="noreferrer">
                View Recipe
            </a>
        </div>
    );
};

export default FavoriteRecipe;