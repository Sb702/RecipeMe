// FavoriteRecipe.js
import React, { useState } from 'react';
import './FavoriteRecipe.css';

const FavoriteRecipe = ({ favorite }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const description = showMore ? favorite.summary : favorite.summary.split('. ')[0] + '.';

    return (
        <div className="favorite-recipe">
            {favorite.readyInMinutes && <p className="favorite-ready-in-minutes">Ready in {favorite.readyInMinutes} minutes</p>}
            
            <img className="favorite-image" src={favorite.image} alt={favorite.title} />

            <h3 className="favorite-title">{favorite.title}</h3>

            <p className="favorite-description" dangerouslySetInnerHTML={{ __html: description }} />

            {favorite.summary.split('. ').length > 1 && (
                <button className="show-more-button" onClick={toggleShowMore}>
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default FavoriteRecipe;