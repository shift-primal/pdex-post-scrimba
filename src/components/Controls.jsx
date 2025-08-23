export default function Controls({ pokemon, setPokemonToFetch, showContent }) {
	function handleForm(formData) {
		setPokemonToFetch(formData.get("newPokemon"));
	}

	function nextPokemon() {
		if (pokemon.id < 1025) {
			setPokemonToFetch(pokemon.id + 1);
		} else {
			console.log("Invalid ID");
		}
	}

	function prevPokemon() {
		if (pokemon.id > 1) {
			setPokemonToFetch(pokemon.id - 1);
		} else {
			console.log("Invalid ID");
		}
	}

	return (
		<div
			id="controls-container"
			className="absolute top-1/2 -translate-y-1/2 right-30 gap-x-2 h-40 w-fit px-4 items-center bg-background grid grid-rows-2 grid-cols-2 rounded-xl"
		>
			<form
				action={handleForm}
				className="col-span-2"
			>
				<input
					type="text"
					name="newPokemon"
					disabled={!showContent}
					className="min-w-50 h-full border-2 rounded-md focus:outline-none p-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background hover:bg-gray-100 focus:bg-gray-200"
				/>
			</form>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={prevPokemon}
				disabled={!showContent}
			>
				Previous
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={nextPokemon}
				disabled={!showContent}
			>
				Next
			</button>
		</div>
	);
}
