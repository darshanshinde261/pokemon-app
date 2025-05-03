import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./redux/pokemonSlice";
import { useFavorites } from "./contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { data: pokemon, status } = useSelector((state) => state.pokemon);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("id");
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  const sortedPokemon = useMemo(() => {
    return [...pokemon].sort((a, b) => {
      if (sortOption === "id") {
        return a.url.split("/").slice(-2, -1)[0] - b.url.split("/").slice(-2, -1)[0];
      } else if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [pokemon, sortOption]);

  const filteredPokemon = useMemo(() => {
    return sortedPokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedPokemon, search]);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPokemon, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const isFavorite = (pokemon) => favorites.some((fav) => fav.name === pokemon.name);

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
    navigate(`/pokemon/${randomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-400 to-indigo-600 p-6 text-white">
      <div className="max-w-xl mx-auto mb-6">
        <button
          className="p-3 bg-yellow-400 text-black rounded-lg mb-4"
          onClick={handleRandomPokemon}
        >
          Random Pokémon
        </button>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <select
            className="p-2 rounded-lg text-black"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <select
            className="p-2 rounded-lg text-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {status === "loading" && <p className="text-center">Loading Pokémon...</p>}
      {status === "failed" && <p className="text-center text-red-500">Failed to load Pokémon</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {paginatedPokemon.map((p, index) => {
          const id = p.url.split("/").slice(-2, -1)[0];

          return (
            <div
              key={p.name}
              className="bg-white p-4 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center relative"
              onClick={() => navigate(`/pokemon/${id}`)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={p.name}
                className="w-24 h-24 transition-all hover:scale-110"
              />
              <p className="text-lg font-bold capitalize text-gray-800 mt-2">{p.name}</p>
              <p className="text-sm text-gray-500">#{id}</p>
              <button
                className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite(p) ? "bg-red-500" : "bg-gray-300"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite(p) ? removeFavorite(p) : addFavorite(p);
                }}
              >
                {isFavorite(p) ? "★" : "☆"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="p-2 mx-2 bg-yellow-400 text-black rounded-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="p-2">Page {currentPage} of {totalPages}</span>
        <button
          className="p-2 mx-2 bg-yellow-400 text-black rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
