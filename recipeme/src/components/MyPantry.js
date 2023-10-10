import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./MyPantry.css";

export default function MyPantry({ pantryItems, setDeleteIngredient }) {



  const handleDelete = async (pantryItem) => {
    const { data, error } = await supabase
      .from("Pantry")
      .delete()
      .eq("pantry", pantryItem);

    if (error) {
      console.log("Error deleting pantry item:", error.message);
    } else {
      console.log("Pantry item deleted:", data);
      setDeleteIngredient(true);

    }
  };

  return (
    <div>
      <h3>My Pantry</h3>
      <ul className="pantry-list">
        {pantryItems.map((item, index) => (
          <li className="ingredient" key={index}>
            {item.pantry}
            <div className="amount-buttons">
              <button className="amount-button">Low</button>
              <button className="amount-button">Medium</button>
              <button className="amount-button">High</button>
              <button onClick={() => handleDelete(item.pantry)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}