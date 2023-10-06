import { useState, useEffect } from 'react';
import './SearchPage.css';
import { supabase } from './supabaseClient';

function SearchPage( {data, loggedIn} ) {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState('');

    useEffect(() => {
        async function handleLike() {
            if (data && data.user && data.user.id && favorites !== '') {
                const { error } = await supabase
                    .from('User')
                    .insert({ Favorites: favorites })
                if (error) {
                    console.log(error);
                } else {
                    console.log("data inserted");
                }
            }
        }
        handleLike();
    }, [favorites, data]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b8c03f2780e148878d1d8edc1a098c70`);
        const data = await response.json();
        setRecipes(data.results);
        console.log(data)
    };

    function handleSetFavorite(e, recipe) {
        e.preventDefault();
        setFavorites(recipe.id);
    }
    return (
        <div className="search-page">
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for recipes" />
                <button type="submit">Search</button>
            </form>
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe">
                        <img src={`${recipe.image}`} alt={recipe.title} width="300" height="200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found'; }} />
                        <h2>{recipe.title}</h2>
                        <button onClick={(e) => handleSetFavorite(e, recipe)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;