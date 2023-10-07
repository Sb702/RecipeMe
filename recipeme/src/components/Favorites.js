import FavoriteRecipe from "./FavoriteRecipe";

export default function Favorites( {favorites} ) {
    const generateKey = (prefix) => {
        return `${prefix}-${new Date().getTime()}-${Math.random()}`;
    };

  return (
    <div>
      <h3 className="favorites-subheader">Favorites</h3>

      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <FavoriteRecipe key={generateKey("favorite")} favorite={favorite} />
        ))}
      </div>
    </div>
  );
}
