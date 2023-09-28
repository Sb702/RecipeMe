import { useState } from 'react';
import './SearchPage.css';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b8c03f2780e148878d1d8edc1a098c70`);
        const data = await response.json();
        setRecipes(data.results);
    };

    return (
        <div className="search-page">
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for recipes" />
                <button type="submit">Search</button>
            </form>
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe">
                        <img src={`${recipe.image}`} alt={recipe.title} width="300" height="200" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+available'; }} />
                        <h3>{recipe.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;