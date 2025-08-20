import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import fetchPokemon from "./utils/api";
import { ArrowLeft } from "lucide-react";
import { typeColors } from "./utils/colors";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonToFetch, setPokemonToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemon(pokemonToFetch, setIsLoading, setPokemon);
  }, [pokemonToFetch]);

  let pokemonTypes = {};
  let pokemonBiometrics = {};

  function handleForm(formData) {
    setPokemonToFetch(formData.get("newPokemon"));
  }

  function nextPokemon() {
    setPokemonToFetch(pokemon.id + 1);
  }

  function prevPokemon() {
    setPokemonToFetch(pokemon.id - 1);
  }

  function formatName(input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
  }

  function formatId(id) {
    if (id < 10) {
      return `00${id}`;
    }
    if (id >= 10 && id < 100) {
      return `0${id}`;
    }
    if (id >= 100) {
      return `${id}`;
    }
  }

  /*   console.log(pokemon); */

  if (!isLoading) {
    pokemonTypes = {
      firstType: pokemon.types[0].type.name,
      secondType: pokemon.types[1]?.type.name,
    };

    pokemonBiometrics = {
      weight: pokemon.weight,
      height: pokemon.height,
      moves: [
        pokemon.abilities[0].ability.name,
        pokemon.abilities[1].ability.name,
      ],
    };
  }

  return (
    <>
      <main className="min-h-screen place-content-center bg-gray-950">
        <div
          className="app-container flex flex-col items-center relative p-4 outline-4 outline-white"
          style={{ backgroundColor: typeColors[pokemonTypes.firstType] }}
        >
          {isLoading && (
            <div
              id="loading-container"
              className="absolute inset-0 flex justify-center items-center"
            >
              <ClipLoader size={60} />
            </div>
          )}
          {!isLoading && (
            <>
              <section
                id="title"
                className="h-20 flex items-center justify-around w-full my-4 text-white"
              >
                <button>
                  <ArrowLeft size={32} />
                </button>
                <h1 className="text-4xl leading-8 font-semibold">
                  {formatName(pokemon.name)}
                </h1>
                <h2 className="text-2xl leading-4 font-bold">
                  #{formatId(pokemon.id)}
                </h2>
              </section>
              <section
                id="image"
                className="w-[400px] h-[400px] flex justify-center"
              >
                <img
                  className="object-contain object-center absolute"
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt="Image loading failed"
                />
              </section>
              <section
                id="card"
                className="w-full h-[725px] bg-white rounded-2xl text-foreground pt-30 flex flex-col gap-y-8"
              >
                <div id="types" className="flex justify-evenly px-32">
                  {Object.entries(pokemonTypes).map((type) => {
                    if (type[1]) {
                      return (
                        <span
                          key={type}
                          className="w-[100px] h-[40px] flex justify-center items-center text-xl text-white font-bold rounded-4xl"
                          style={{ backgroundColor: `${typeColors[type[1]]}` }}
                        >
                          {formatName(type[1])}
                        </span>
                      );
                    }
                  })}
                </div>
                <h3
                  className="font-bold text-2xl"
                  style={{
                    color: `${typeColors[pokemonTypes.firstType]}`,
                  }}
                >
                  About
                </h3>
                <div id="biometrics">
                  {Object.entries(pokemonBiometrics).map((metric) => {
                    return (
                      <div key={metric}>
                        <span>{metric}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
          <div
            id="controls-container"
            className="absolute bottom-20 flex gap-x-2"
          >
            <form action={handleForm}>
              <input
                type="text"
                name="newPokemon"
                disabled={isLoading}
                className="min-w-50 h-full border-2 rounded-md focus:outline-none p-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background hover:bg-gray-100 focus:bg-gray-200"
              />
            </form>
            <button
              className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
              onClick={prevPokemon}
              disabled={isLoading}
            >
              Previous
            </button>
            <button
              className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
              onClick={nextPokemon}
              disabled={isLoading}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
