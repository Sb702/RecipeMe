import React, { useState } from "react";
import IngredientSearch from "../components/IngredientSearch";
import MyPantry from "../components/MyPantry";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

const IngredientLayout = ({ userid }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [deleteIngredient, setDeleteIngredient] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchTerm.length > 2) {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=b8c03f2780e148878d1d8edc1a098c70&query=${searchTerm}`
      );
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

  useEffect(() => {
    async function fetchPantryItems() {
      const { data, error } = await supabase.from("Pantry").select("pantry");

      if (error) console.log("Error fetching pantry items:", error.message);
      else {
        console.log("Pantry items:", data);
        setPantryItems(data);
      }
    }
    fetchPantryItems();
    setSelectedIngredient("");
  }, [selectedIngredient, deleteIngredient]);

  return (
    <div>
      <IngredientSearch
        searchTerm={searchTerm}
        searchResults={searchResults}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setSelectedIngredient={setSelectedIngredient}
        userid={userid}
      />
      <MyPantry
        pantryItems={pantryItems}
        userid={userid}
        setDeleteIngredient={setDeleteIngredient}
      />
    </div>
  );
};

export default IngredientLayout;
