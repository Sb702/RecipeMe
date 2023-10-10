import { useState, useEffect } from 'react';
import './SearchPage.css';
import axios from 'axios';
import { supabase } from './supabaseClient';

function SearchPage({ data, userid }) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    console.log(userid);

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

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for recipes"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.recipe.uri}>
                        <h3>{recipe.recipe.label}</h3>
                        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                        <p>{recipe.recipe.source}</p>
                        <button onClick={() => handleLikeRecipe(recipe)}>Like</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPage;