import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoritesView = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-400 to-indigo-600 p-6 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p className="text-center">No favorite Pokémon yet!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {favorites.map((pokemon, index) => (
            <div
              key={pokemon.name}
              className="bg-white p-4 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center relative"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-24 h-24 transition-all hover:scale-110"
              />
              <p className="text-lg font-bold capitalize text-gray-800 mt-2">{pokemon.name}</p>
              <p className="text-sm text-gray-500">#{pokemon.id}</p>
              <button
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500"
                onClick={() => removeFavorite(pokemon)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;