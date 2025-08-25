export function getNextPokemonId(pokemon) {
	if (pokemon.id < 1025) {
		return pokemon.id + 1;
	} else {
		console.log("Invalid ID");
		return pokemon.id;
	}
}

export function getPrevPokemonId(pokemon) {
	if (pokemon.id > 1) {
		return pokemon.id - 1;
	} else {
		console.log("Invalid ID");
		return pokemon.id;
	}
}
