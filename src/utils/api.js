export default async function fetchPokemon(
  pokemonToFetch,
  setShowContent,
  setPokemon,
  setSpecies
) {
  setShowContent(false);

  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`;
  const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonToFetch}`;

  console.log(`Loading...`);

  try {
    // Fetch both simultaneously
    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(urlPokemon),
      fetch(urlSpecies),
    ]);

    const [pokemonData, speciesData] = await Promise.all([
      pokemonResponse.json(),
      speciesResponse.json(),
    ]);

    const imageUrl =
      pokemonData.sprites?.other?.["official-artwork"]?.front_default;

    if (imageUrl) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = imageUrl;
      });
    }

    setPokemon(pokemonData);
    setSpecies(speciesData);

    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
  } catch (err) {
    console.error("Error fetching Pokemon data:", err);
  } finally {
    setShowContent(true);
  }
}
