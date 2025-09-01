import { use, useState } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { getNextPokemonId, getPrevPokemonId } from "../utils/controls";
import { ChevronFirst, ChevronLast } from "lucide-react";

export default function DevTools() {
	const { currentPokemon, showContent, setPokemonToFetch, onLoadData, setMenuOpen, setShowContent } =
		use(PokemonContext);

	const [toolsOpen, setToolsOpen] = useState(false);

	const handleForm = (formData) => setPokemonToFetch(formData.get("newPokemon"));
	const handleNext = () => setPokemonToFetch(getNextPokemonId(currentPokemon));
	const handlePrev = () => setPokemonToFetch(getPrevPokemonId(currentPokemon));
	const logCurrentId = () => console.log(`Current ID: ${currentPokemon.id}`);
	const logOnLoadData = () => console.log("OnLoad Data:", onLoadData);
	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const toggleShowContent = () => setShowContent((prev) => !prev);
	const toggleTools = () => setToolsOpen((prev) => !prev);

	return (
		<div
			id="controls-container"
			className="absolute bottom-10 left-10 h-fit w-fit max-w-xl p-4 bg-background rounded-xl flex items-center z-100"
		>
			<button
				onClick={toggleTools}
				className="left-0 w-fit h-full focus:outline-none p-2 cursor-pointer"
			>
				{!toolsOpen ? <ChevronLast /> : <ChevronFirst />}
			</button>
			<div
				id="controls"
				className={`flex flex-wrap items-center justify-center gap-2 ${!toolsOpen ? "hidden" : ""}`}
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
		</div>
	);
}
