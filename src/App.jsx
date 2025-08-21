import { useState, useEffect } from "react";
import { Ruler, Stars, Weight } from "lucide-react";
import fetchPokemon from "./utils/api";
import { typeColors } from "./utils/colors";
import { capitalize, formatHeight, formatWeight } from "./utils/format";
import Loading from "./components/Loading";
import Title from "./components/Title";
import Image from "./components/Image";
import Card from "./components/Card";
import Controls from "./components/Controls";

function App() {
  // useStates

  const [pokemon, setPokemon] = useState([]);
  const [species, setSpecies] = useState([]);
  const [prevPokemon, setPrevPokemon] = useState([]);
  const [prevSpecies, setPrevSpecies] = useState([]);
  const [pokemonToFetch, setPokemonToFetch] = useState(1);
  const [showContent, setShowContent] = useState(false);

  // useEffects

  useEffect(() => {
    fetchPokemon(pokemonToFetch, setShowContent, setPokemon, setSpecies);
  }, [pokemonToFetch]);

  useEffect(() => {
    if (showContent) {
      setPrevPokemon(pokemon);
      setPrevSpecies(species);
    }
  }, [showContent, pokemon, species]);

  // Define and assign Pokemon info

  let pokemonTypes = {};
  let pokemonBiometrics = [];
  let pokemonStats = [];
  let pokemonCardData = {
    types: pokemonTypes,
    biometrics: [],
    stats: [],
    colors: typeColors,
    species: { flavor_text_entries: [] },
  };

  if (pokemon && pokemon.types && showContent) {
    pokemonTypes = {
      firstType: pokemon.types[0].type.name,
      secondType: pokemon.types[1]?.type.name,
    };

    pokemonBiometrics = [
      { name: "Weight", value: formatWeight(pokemon.weight), icon: <Weight /> },
      { name: "Height", value: formatHeight(pokemon.height), icon: <Ruler /> },
      {
        name: "Main Ability",
        value: capitalize(pokemon.abilities[0].ability.name),
        icon: <Stars />,
      },
    ];

    pokemonStats = [
      { name: "HP", value: pokemon.stats[0].base_stat },
      { name: "ATK", value: pokemon.stats[1].base_stat },
      { name: "DEF", value: pokemon.stats[2].base_stat },
      { name: "SATK", value: pokemon.stats[3].base_stat },
      { name: "SDEF", value: pokemon.stats[4].base_stat },
      { name: "SPD", value: pokemon.stats[5].base_stat },
    ];

    pokemonCardData = {
      types: pokemonTypes,
      biometrics: pokemonBiometrics,
      stats: pokemonStats,
      colors: typeColors,
      species: species,
    };
  }

  // Conditions

  return (
    <>
      <main className="min-h-screen place-content-center bg-gray-950 transition-all">
        <div
          className="app-container flex flex-col items-center relative p-4 outline-4 outline-white"
          style={{
            backgroundColor: currentBgColor,
          }}
        >
          {!showContent && <Loading />}
          {(showContent || pokemon?.name) && (
            <>
              <Title pokemon={pokemon} />
              <Image
                pokemon={pokemon}
                onImageLoad={() => setImageLoaded(true)}
              />
              <Card
                pokemon={pokemon}
                cardData={pokemonCardData}
              />
            </>
          )}
        </div>
        <Controls
          pokemon={pokemon}
          setPokemonToFetch={setPokemonToFetch}
          showContent={showContent}
        />
      </main>
    </>
  );
}

export default App;
