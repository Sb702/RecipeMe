import React, { useState } from 'react';

const IngredientSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        if (searchTerm.length > 2) {
            const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=b8c03f2780e148878d1d8edc1a098c70&query=${searchTerm}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="ingredient-search">
            <h3>Ingredient Search</h3>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Search for an ingredient" value={searchTerm} onChange={handleSearchChange} />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientSearch;