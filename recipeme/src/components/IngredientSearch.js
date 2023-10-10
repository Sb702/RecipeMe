import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./IngredientSearch.css";
import { v4 as uuidv4 } from "uuid";

export default function IngredientSearch({ userid, setSelectedIngredient }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // console.log(userid)

  async function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchTerm.length > 2) {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=a0661c3f&app_key=58b9985f8ac08ad92f5e599f8e933072&ingr=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data.hints)) {
          setSearchResults(data.hints.map((hint) => hint.food));
          console.log(searchResults);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]);
    }
  }

  const handleClick = async (result) => {
    try {
      const { data, error } = await supabase
        .from("Pantry")
        .insert([{ pantry: result.label, userid: userid }]);
      if (error) {
        throw error;
      }
      console.log("Inserted into Pantry:", data);
      setSelectedIngredient(result.name);
    } catch (error) {
      console.log("Error inserting into Pantry:", error.message);
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
          <li
            key={uuidv4()}
            onClick={() => handleClick(result)}
            className="ingredient-item"
          >
            {result.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
