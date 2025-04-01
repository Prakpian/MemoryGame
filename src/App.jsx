import { useState, useEffect, use } from "react";
import "./App.css";
import Card from "./components/Card";
import Button from "./components/Button";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonSelected, setPokemonSelected] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerLost, setPlayerLost] = useState(false);

  const reset = () => {
    setPlayerScore(0);
    setPokemonSelected([]);
    setPlayerLost(false);
  };

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

  const shuffle = (e) => {
    if (pokemonSelected.includes(e.target.alt)) {
      setPlayerLost(true);
    } else {
      const pokemonCopy = [...pokemon];
      const newShuffled = [];

      while (pokemonCopy.length !== 0) {
        const randomIndex = Math.floor(Math.random() * pokemonCopy.length);
        newShuffled.push(pokemonCopy[randomIndex]);
        pokemonCopy.splice(randomIndex, 1);
      }

      setPokemonSelected((prev) => [...prev, e.target.alt]);
      setPlayerScore((prev) => prev + 1);
      setPokemon(newShuffled);
    }
  };

  return (
    <div className="place-items-center">
      <img src="/pokemon-23.svg" alt="Pokemon Logo" className="w-100 my-10" />
      {isLoading ? (
        <h1 className="text-4xl mt-50 font-bold">Loading...</h1>
      ) : (
        <div className="bg-gray-100 min-h-[500px] max-w-[900px] grid place-items-center p-5 pb-10 m-5 rounded-xl gap-5 drop-shadow-lg">
          <p className="bg-white p-4 rounded-md font-medium drop-shadow-sm">
            You can only select one of each or else you lose!
          </p>
          <p className="font-bold">Your score: {playerScore}</p>
          {playerScore == 12 && (
            <div>
              <p className="font-bold">You Won!🥳</p>
              <p>Press 'Reset' to play again</p>
            </div>
          )}

          <div className="flex flex-wrap place-content-center gap-2 my-5">
            {playerScore !== 12 &&
              playerLost !== true &&
              pokemon.map((p, i) => {
                return (
                  <Card
                    {...p}
                    key={i}
                    score={playerScore}
                    select={setPokemonSelected}
                    handleClick={(e) => shuffle(e)}
                  />
                );
              })}
            {playerLost == true && (
              <div className="place-items-center">
                <p className="font-bold text-xl">You lost! 💔</p>
                <p>Press 'reset' to play again</p>
              </div>
            )}
          </div>
          <Button
            btnText={"Reset"}
            btnClass={"bg-green-600 text-white font-bold"}
            btnClick={reset}
          />
        </div>
      )}
    </div>
  );
}

export default App;
