// FavoriteRecipe.js
import React, { useState, useEffect } from 'react';
import './FavoriteRecipe.css';

const FavoriteRecipe = ({ favorite }) => {
    const [recipe, setRecipe] = useState(null);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        setFavoriteId(favorite.Favorites);
    }, [favorite]);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${favoriteId}/information?apiKey=b8c03f2780e148878d1d8edc1a098c70`
            );
            const data = await response.json();
            setRecipe(data);
        };
        if (favoriteId) {
            fetchRecipe();
        }
    }, [favoriteId]);

    return (
        <div className="favorite-recipe">
            {recipe && (
                <div>
                    <div className="recipe-header">
                        <h2 className="recipe-title">{recipe.title}</h2>
                        <img className="recipe-image" src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="recipe-summary">
                        <p>{recipe.summary}</p>
                    </div>
                    <div className="recipe-details">
                        <div className="recipe-details-item">
                            <h3>Prep Time</h3>
                            <p>{recipe.preparationMinutes} minutes</p>
                        </div>
                        <div className="recipe-details-item">
                            <h3>Cook Time</h3>
                            <p>{recipe.cookingMinutes} minutes</p>
                        </div>
                        <div className="recipe-details-item">
                            <h3>Servings</h3>
                            <p>{recipe.servings}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoriteRecipe;