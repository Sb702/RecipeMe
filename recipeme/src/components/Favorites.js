import FavoriteRecipe from "./FavoriteRecipe";

export default function Favorites( {favorites} ) {
  const generateKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}-${Math.random()}`;
  };

  const favoriteRecipes = Object.values(favorites);

  return (
    <div>
      <h3 className="favorites-subheader">Favorites</h3>
      <div className="favorites-grid">
        {favoriteRecipes.map((favorite, index) => (
          <FavoriteRecipe key={generateKey("favorite")} recipe={favorite} />
        ))}
      </div>
    </div>
  );
}