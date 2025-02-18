import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./redux/pokemonSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { data: pokemon, status } = useSelector((state) => state.pokemon);
  const [search, setSearch] = useState("");

  // Fetch only on first render
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-400 to-indigo-600 p-6 text-white">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading & Error Handling */}
      {status === "loading" && <p className="text-center">Loading Pokémon...</p>}
      {status === "failed" && <p className="text-center text-red-500">Failed to load Pokémon</p>}

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {filteredPokemon.map((p, index) => {
          const id = p.url.split("/").slice(-2, -1)[0];

          return (
            <div
              key={p.name}
              className="bg-white p-4 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={p.name}
                className="w-24 h-24 transition-all hover:scale-110"
              />
              <p className="text-lg font-bold capitalize text-gray-800 mt-2">{p.name}</p>
              <p className="text-sm text-gray-500">#{id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
