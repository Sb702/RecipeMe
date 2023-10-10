import { useState, useEffect } from 'react';
import './SearchPage.css';
import axios from 'axios';
import { supabase } from './supabaseClient';

function SearchPage({ data, userid }) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);    // console.log(userid);

    useEffect(() => {
        async function handleLike() {
            if (favorites.length > 0) {
                const { data: insertedData, error } = await supabase
                    .from('User')
                    .insert([{ Favorites: favorites, userid: userid }]);
                if (error) {
                    console.log(error);
                } else {
                    console.log(insertedData);
                }
            }
        }
        handleLike();
    }, [favorites]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(
            `https://api.edamam.com/search?q=${query}&app_id=66965766&app_key=2c893f1526b753955ece70cb994d99eb`
        );
        setRecipes(response.data.hits);
        console.log(response.data.hits[0])
    };


    // when we click I want to insert make that speicifc recipe the favorite from the recipes state
    const handleLikeRecipe = (recipe) => {
        setFavorites([...favorites, recipe]);
    };

        {/* function to conditionally render the ingredients when the 'Ingredients' button is clicked */}
        function handleShowIngredients(recipeId) {
            setSelectedRecipeId(recipeId === selectedRecipeId ? null : recipeId);
        }

    return (
        <div>
            <form className='search-form' onSubmit={handleSearch}>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Search for recipes"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='search-button' type="submit">Search</button>
            </form>
    {/* <div className='nutrition-slider'>
    <p>Nutrition Info</p>
    <p>{recipe.recipe.totalNutrients.PROCNT.label}: {recipe.recipe.totalNutrients.PROCNT.quantity} {recipe.recipe.totalNutrients.PROCNT.unit}</p>
   <p> {recipe.recipe.totalNutrients.SUGAR.label}: {recipe.recipe.totalNutrients.SUGAR.quantity} {recipe.recipe.totalNutrients.SUGAR.unit}</p>
</div> */}

<ul className='recipes-grid'>
    {recipes.map((recipe) => (
        <div className='recipe-container'>
            <li key={recipe.recipe.uri} className='recipe'>
                <h3 className='recipe'>{recipe.recipe.label}</h3>
                <img className='recipe-img' src={recipe.recipe.image} alt={recipe.recipe.label} />

                <div className='button-wrap'>
                <button className='recipe-btn' onClick={() => handleLikeRecipe(recipe)}>Like</button>
                <button className='recipe-btn' onClick={() => handleShowIngredients(recipe.recipe.uri)}>Ingredients</button>
                </div>

                <div className='ingredients-wrap, {selectedRecipeId === recipe.recipe.uri ? "show-ingredients" : 
                "hide-ingredients"}'>
                    {recipe.recipe.ingredientLines.map((ingredient, index) => (
                        <p className={selectedRecipeId === recipe.recipe.uri ? 'show-ingredients' : 'hide-ingredients'} key={index}>{ingredient}</p>
                    ))}
                </div>
            </li>
        </div>
    ))}
</ul>
        </div>
    );
}

export default SearchPage;