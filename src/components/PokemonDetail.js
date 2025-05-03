import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        setEvolutionChain(evolutionData);
      } catch (err) {
        setError("Failed to load Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-blue-500 to-indigo-800 min-h-screen text-white">
      {pokemon && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h1 className="text-4xl font-bold capitalize text-center mb-4">{pokemon.name}</h1>
          <div className="flex justify-center mb-6">
            <img
              src={pokemon.sprites.front_default || process.env.PUBLIC_URL + '/pickachu.png'}
              alt={pokemon.name}
              className="w-48 h-48"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4 border-b pb-2">Stats</h2>
          <ul className="grid grid-cols-2 gap-4 mt-2">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="flex justify-between">
                <span className="font-medium capitalize">{stat.stat.name}:</span>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Abilities</h2>
          <ul className="list-disc list-inside mt-2">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="capitalize">
                {ability.ability.name}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Moves</h2>
          <ul className="list-disc list-inside mt-2">
            {pokemon.moves.slice(0, 10).map((move) => (
              <li key={move.move.name} className="capitalize">
                {move.move.name}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 border-b pb-2">Evolution Chain</h2>
          {evolutionChain && (
            <ul className="list-disc list-inside mt-2">
              {(() => {
                const chain = [];
                let current = evolutionChain.chain;
                while (current) {
                  chain.push(current.species.name);
                  current = current.evolves_to[0];
                }
                return chain.map((name, index) => (
                  <li key={index} className="capitalize">
                    {name}
                  </li>
                ));
              })()}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;