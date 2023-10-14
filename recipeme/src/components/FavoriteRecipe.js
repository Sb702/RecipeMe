// FavoriteRecipe.js
import { useState } from 'react';
import './FavoriteRecipe.css';
import { supabase } from '../supabaseClient';

const FavoriteRecipe = ({ recipe, setDeleted }) => {
    const [showIngredients, setShowIngredients] = useState(false);

    if (!recipe) {
        return null;
    }

    const ingredients = recipe.recipe.ingredientLines.map((ingredient, index) => (
        <p className='favorite-ingredient' key={index}>{ingredient}</p>
    ));

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('User')
            .delete()
            .eq('name', recipe.recipe.label);

        if (error) {
            console.log('Error deleting recipe:', error.message);
        } else {
            console.log('Recipe deleted successfully:', data);
            setDeleted(true);
        }
    };

    return (
        <div className="favorite-recipe">
            <h2 className='favorite-title'>{recipe.recipe.label}</h2>

            <div className='favorite-recipe-content'>
                <img className='favorite-img' src={recipe.recipe.image} />

                <div className='favorite-ingredient-wrap'>
                    {showIngredients ? (
                        <div className='favorite-ingredients'>{ingredients}</div>
                    ) : (
                        <div className='favorite-ingredients-collapsed'>
                            {ingredients.slice(0, 3)}
                        </div>
                    )}
                </div>
            </div>

        <div className='favorite-recipe-btns'>
            <a href={recipe.recipe.url} target="_blank" rel="noreferrer">
                <button className='recipe-btn'>View Recipe</button>
            </a>
            <button className='recipe-btn' onClick={toggleIngredients}>
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
            </button>
            <button onClick={handleDelete} className='recipe-btn'>Delete</button>
        </div>
    </div>
    );
};

export default FavoriteRecipe;