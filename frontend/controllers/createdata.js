import { formatWeight, formatHeight, capitalize } from "@utils";

export default async function createPokemon(pokemonToFetch) {
	return fetch(`http://localhost:3000/pokemon/${pokemonToFetch}`)
		.then((res) => res.json())
		.then((rawPokemon) => {
			const pokemon = {
				name: rawPokemon.name,
				id: rawPokemon.id,

				biometrics: {
					weight: { name: "Weight", value: formatWeight(rawPokemon.weight) },
					height: { name: "Height", value: formatHeight(rawPokemon.height) },
					mainAbility: { name: "Main Ability", value: capitalize(rawPokemon.main_ability) },
				},

				audio: rawPokemon.audio_url,
				sprite: rawPokemon.sprite_url,

				flavorText: rawPokemon.flavor_text,

				types: {
					first: rawPokemon.first_type,
					second: rawPokemon.second_type,
				},

				stats: {
					hp: { name: "HP", value: rawPokemon.hp },
					attack: { name: "ATK", value: rawPokemon.attack },
					defense: { name: "DEF", value: rawPokemon.defense },
					specialAttack: { name: "SATK", value: rawPokemon.special_attack },
					specialDefense: { name: "SDEF", value: rawPokemon.special_defense },
					speed: { name: "SPD", value: rawPokemon.speed },
				},
			};
			return pokemon;
		});
}
