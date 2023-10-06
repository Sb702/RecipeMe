// AccountPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import FavoriteRecipe from './components/FavoriteRecipe';

const AccountPage = ({ data }) => {
    const [favorites, setFavorites] = useState({});

    const handleReload = async () => {
        const { data, error } = await supabase
            .from("User")
            .select("Favorites")
        if (error) {
            console.log(error);
        } else {
            setFavorites(data);
            console.log(data);
        }
    };

    useEffect(() => {
        handleReload();
    }, []);

    const generateKey = (prefix) => {
        return `${prefix}-${new Date().getTime()}-${Math.random()}`;
    };

    return (
        <div className="account-page">
            <h2>Account Page</h2>
            <p>Welcome, {data && data.user && data.user.email}!</p>
            <button onClick={handleReload}>Reload</button>
            <h3>Favorites</h3>
            
            <div className="favorites-grid">
            {/* {favorites.map((favorite) => (
                <FavoriteRecipe key={generateKey('favorite')} favorite={favorite} />
                ))} */}
                </div>
        </div>
    );
};

export default AccountPage;