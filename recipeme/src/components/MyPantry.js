import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./MyPantry.css";

export default function MyPantry({ pantryItems }) {
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
