import React, { useState } from "react";

const ComparisonTool = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [error, setError] = useState(null);

  const fetchPokemon = async (name, setPokemon) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompare = () => {
    fetchPokemon(input1, setPokemon1);
    fetchPokemon(input2, setPokemon2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-400 to-indigo-600 p-6 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Compare Pokémon</h1>
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Pokémon 1"
          className="p-3 border border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Pokémon 2"
          className="p-3 border border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <button
          className="p-3 bg-yellow-400 text-black rounded-lg"
          onClick={handleCompare}
        >
          Compare
        </button>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
        {[pokemon1, pokemon2].map((pokemon, index) => (
          pokemon && (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              <h2 className="text-lg font-bold capitalize mt-2">{pokemon.name}</h2>
              <ul className="mt-4">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ComparisonTool;