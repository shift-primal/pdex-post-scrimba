export default async function fetchPokemon(pokemonToFetch) {
	const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonToFetch}`;

	try {
		const [pokemonResponse, speciesResponse] = await Promise.all([fetch(urlPokemon), fetch(urlSpecies)]);

		const [pokemonData, speciesData] = await Promise.all([pokemonResponse.json(), speciesResponse.json()]);

		return { pokemon: pokemonData, species: speciesData };
	} catch (err) {
		console.error("Error fetching Pokemon data:", err);
	} finally {
	}
}
