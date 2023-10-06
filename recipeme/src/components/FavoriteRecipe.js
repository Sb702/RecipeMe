// FavoriteRecipe.js
import React from 'react';
import './FavoriteRecipe.css';

const FavoriteRecipe = ({ favorite }) => {

    console.log(favorite)
    return (
        <div className="favorite-recipe">
            {<h3>{favorite.title}</h3>}
            {/* image that accesses favorite.image which will be a url */}
            <img src={favorite.image}/>
            <div dangerouslySetInnerHTML={{ __html: favorite.summary }} />        </div>
    );
};

export default FavoriteRecipe;