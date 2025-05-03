import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    const id = pokemon.url.split("/").slice(-2, -1)[0]; // Extract ID from the URL
    setFavorites((prev) => [...prev, { ...pokemon, id }]);
  };

  const removeFavorite = (pokemon) => {
    setFavorites((prev) => prev.filter((fav) => fav.name !== pokemon.name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);