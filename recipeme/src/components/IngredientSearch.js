import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './IngredientSearch.css';

export default function IngredientSearch({ userid, setSelectedIngredient }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log(userid)

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

    const handleClick = async (result) => {
        try {
            const { data, error } = await supabase.from('Pantry').insert([{ pantry: result.name, userid: userid }]);
            if (error) {
                throw error;
            }
            console.log('Inserted into Pantry:', data);
            setSelectedIngredient(result.name);
        } catch (error) {
            console.log('Error inserting into Pantry:', error.message);
        }
    };

    return (
        <div className="ingredient-search">
            <h3>Ingredient Search</h3>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for an ingredient"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.name} onClick={() => handleClick(result)} className="ingredient-item">
                        {result.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}