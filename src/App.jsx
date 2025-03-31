import { useState, useEffect, use } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
        const data = await res.json();

        const simplePokemonData = data.results.map((pokemon, i) => {
          const id = i + 1;
          return {
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
        setPokemon(simplePokemonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <div className="place-items-center">
      <img src="/pokemon-23.svg" alt="Pokemon Logo" className="w-100 my-10" />
      {isLoading ? (
        <h1 className="text-4xl mt-50 font-bold">Loading...</h1>
      ) : (
        <div className="bg-gray-200 min-h-[500px] max-w-[900px] place-items-center p-5 m-5 rounded-xl">
          <p className="bg-white p-4 rounded-md">
            You can only select one of each or else you lose!
          </p>
          <div className="flex flex-wrap place-content-center gap-2 mt-5">
            {" "}
            {pokemon.map((p, i) => {
              return <Card {...p} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
