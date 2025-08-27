import { use } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { getNextPokemonId, getPrevPokemonId } from "../utils/controls";

export default function DevTools() {
	const { currentPokemon, showContent, setPokemonToFetch, onLoadData, setMenuOpen, setShowContent } =
		use(PokemonContext);

	const handleForm = (formData) => setPokemonToFetch(formData.get("newPokemon"));
	const handleNext = () => setPokemonToFetch(getNextPokemonId(currentPokemon));
	const handlePrev = () => setPokemonToFetch(getPrevPokemonId(currentPokemon));
	const logCurrentId = () => console.log(`Current ID: ${currentPokemon.id}`);
	const logOnLoadData = () => console.log("OnLoad Data:", onLoadData);
	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const toggleShowContent = () => setShowContent((prev) => !prev);

	return (
		<div
			id="controls-container"
			className="absolute top-1/2 -translate-y-1/2 right-10 gap-x-2 h-fit w-fit max-w-xl p-16 bg-background rounded-xl flex flex-wrap items-center justify-center gap-y-2 z-100"
		>
			<form action={handleForm}>
				<input
					type="text"
					name="newPokemon"
					disabled={!showContent}
					placeholder="Search pokemon..."
					className="min-w-50 h-full border-2 rounded-md focus:outline-none p-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background hover:bg-gray-100 focus:bg-gray-200"
				/>
			</form>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={handlePrev}
				disabled={!showContent}
			>
				Previous
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={handleNext}
				disabled={!showContent}
			>
				Next
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={logCurrentId}
				disabled={!showContent}
			>
				Log ID
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={logOnLoadData}
				disabled={!showContent}
			>
				Log onLoadData
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={toggleMenu}
				disabled={!showContent}
			>
				Toggle Menu
			</button>
			<button
				className="border-2 px-3 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-gray-50 hover:bg-gray-100"
				onClick={toggleShowContent}
			>
				Toggle Showcontent
			</button>
		</div>
	);
}
