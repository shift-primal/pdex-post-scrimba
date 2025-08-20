export default function fetchPokemon(pokemonToFetch, setIsLoading, setPokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`;

  setIsLoading(true);
  console.log(`Loading...`);

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setPokemon(json);
      console.log("Loading completed!", json);
      return new Promise((resolve) => setTimeout(() => resolve(json), 1000));
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching Pokemon:", err);
      setIsLoading(false);
    });
}
