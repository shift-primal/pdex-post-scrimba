import { fetchPokemon, typeColors, findEnglishEntry } from "@utils";

export default async function createPokemon(pokemonToFetch) {
	const rawPokemon = await fetchPokemon(pokemonToFetch);

	const pokemon = {
		name: rawPokemon.pokemon.name,
		id: rawPokemon.pokemon.id,

		weight: rawPokemon.pokemon.weight,
		height: rawPokemon.pokemon.height,
		mainAbility: rawPokemon.pokemon.abilities[0].ability.name,
		audio: rawPokemon.pokemon.cries.latest,
		sprite: rawPokemon.pokemon.sprites.other["official-artwork"].front_default,

		flavorText: findEnglishEntry(rawPokemon.species.flavor_text_entries),

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

		colors: typeColors,
	};
	return pokemon;
}
