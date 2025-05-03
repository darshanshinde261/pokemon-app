import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import FavoritesView from "./components/FavoritesView";
import ComparisonTool from "./components/ComparisonTool";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="bg-gray-800 text-white p-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <Link to="/" className="text-lg font-bold">Pokémon App</Link>
          <Link to="/favorites" className="text-lg">Favorites</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/compare" element={<ComparisonTool />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
