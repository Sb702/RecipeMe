// SearchPage.js
import { useState, useEffect } from 'react';
import './SearchPage.css';
import { supabase } from './supabaseClient';

function SearchPage( {data, userid} ) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    console.log(userid)


    useEffect(() => {
        return () => {
            async function handleLike() {
                if (favorites.length > 0) {
                    const { data: insertedData, error } = await supabase
                        .from("User")
                        .insert([{ Favorites: favorites, userid:userid} ]);
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("data inserted:", insertedData);
                    }
                }
            }
            handleLike();
        }
    }, [favorites, userid]);


    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b8c03f2780e148878d1d8edc1a098c70`);
        const data = await response.json();
        setRecipes(data.results || []);
        console.log(data);
    };

    async function handleSetFavorite(e, recipe) {
        e.preventDefault();
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=b8c03f2780e148878d1d8edc1a098c70`
        );
        const data = await response.json();
        setFavorites([...favorites, data]);
    }

    return (
        <div className="search-page">
            <h2>Search Page</h2>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} />
                        <button onClick={(e) => handleSetFavorite(e, recipe)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;