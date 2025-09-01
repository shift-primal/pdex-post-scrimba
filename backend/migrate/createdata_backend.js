import fetchPokemon from "./api_backend.js";
import { typeColors } from "./colors_backend.js";
import { findEnglishEntry, formatFlavorText } from "./format_backend.js";

export default async function createPokemon(pokemonToFetch) {
	const rawPokemon = await fetchPokemon(pokemonToFetch);

	const pokemon = {
		id: rawPokemon.pokemon.id,
		name: rawPokemon.pokemon.name,
		height: rawPokemon.pokemon.height,
		weight: rawPokemon.pokemon.weight,
		mainAbility: rawPokemon.pokemon.abilities[0].ability.name,
		audio: rawPokemon.pokemon.cries.latest,
		sprite: rawPokemon.pokemon.sprites.other["official-artwork"].front_default,
		flavorText: formatFlavorText(findEnglishEntry(rawPokemon.species.flavor_text_entries)),
		types: {
			first: rawPokemon.pokemon.types[0].type.name,
			second: rawPokemon.pokemon.types[1]?.type.name,
		},
		stats: {
			hp: { name: "HP", value: rawPokemon.pokemon.stats[0].base_stat },
			attack: { name: "ATK", value: rawPokemon.pokemon.stats[1].base_stat },
			defense: { name: "DEF", value: rawPokemon.pokemon.stats[2].base_stat },
			specialAttack: { name: "SATK", value: rawPokemon.pokemon.stats[3].base_stat },
			specialDefense: { name: "SDEF", value: rawPokemon.pokemon.stats[4].base_stat },
			speed: { name: "SPD", value: rawPokemon.pokemon.stats[5].base_stat },
		},
	};
	return pokemon;
}
