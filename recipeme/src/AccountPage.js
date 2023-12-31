import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Favorites from './components/Favorites';
import IngredientSearch from './components/IngredientSearch';
import './Pages/AccountPage.css';
import IngredientLayout from './Layouts/IngredientLayout';

const AccountPage = ({ data, userid }) => {
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(true);
    const [deleted, setDeleted] = useState(false);


    const handleLoad = async () => {
        const { data, error } = await supabase
            .from('User')
            .select('Favorites')
            .eq('userid', userid);
        console.log('data:', data);
        console.log('error:', error);
        if (error) {
            console.log(error);
        } else {
            setFavorites(data.map((item) => item.Favorites).flat());
            console.log(data.map((item) => item.Favorites).flat());
        }
    };

    useEffect(() => {
        handleLoad();
        setDeleted(false);
    }, [deleted]);

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
            {showFavorites ? <Favorites favorites={favorites} setDeleted={setDeleted}/> : <IngredientLayout userid={userid} />}
        </div>
    );
};

export default AccountPage;