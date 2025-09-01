import createPokemon from "./createdata_backend.js";
import { insertPokemon } from "../../../database.js";

for (let i = 489; i <= 1025; i++) {
	try {
		console.log(`Fetching Pokemon ${i}...`);
		const pokemon = await createPokemon(i);

		const flatData = [
			pokemon.id,
			pokemon.name,
			pokemon.height,
			pokemon.weight,
			pokemon.mainAbility,
			pokemon.audio,
			pokemon.sprite,
			pokemon.flavorText,
			pokemon.types.first,
			pokemon.types.second,
			pokemon.stats.hp.value,
			pokemon.stats.attack.value,
			pokemon.stats.defense.value,
			pokemon.stats.specialAttack.value,
			pokemon.stats.specialDefense.value,
			pokemon.stats.speed.value,
		];

		insertPokemon.run(...flatData);

		console.log(`✅ Added ${pokemon.name}`);

		await new Promise((resolve) => setTimeout(resolve, 100));
	} catch (error) {
		console.error(`❌ Failed to add Pokemon ${i}:`, error);
	}
}

console.log("Migration complete!");
