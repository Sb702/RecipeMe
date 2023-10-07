import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Favorites from './components/Favorites';
import IngredientSearch from './components/IngredientSearch';
import './Pages/AccountPage.css';

const AccountPage = ({ data }) => {
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(true);

    const handleReload = async () => {
        const { data, error } = await supabase
            .from("User")
            .select("Favorites")
        if (error) {
            console.log(error);
        } else {
            setFavorites(data.map((item) => item.Favorites).flat());
            console.log(data.map((item) => item.Favorites).flat());
        }
    };

    useEffect(() => {
        handleReload();
    }, []);

    const handleToggleFavorites = () => {
        setShowFavorites(true);
    };

    const handleToggleIngredientSearch = () => {
        setShowFavorites(false);
    };

    return (
        <div className="account-page">
            <h2>Account Page</h2>
            <p>Welcome, {data && data.user && data.user.email}!</p>
            <div className="toggle-buttons">
                <button className={showFavorites ? "active" : ""} onClick={handleToggleFavorites}>Favorites</button>
                <button className={!showFavorites ? "active" : ""} onClick={handleToggleIngredientSearch}>Ingredient Search</button>
            </div>
            {showFavorites ? <Favorites favorites={favorites} /> : <IngredientSearch />}
        </div>
    );
};

export default AccountPage;