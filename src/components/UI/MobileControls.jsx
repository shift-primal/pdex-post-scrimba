import { use } from "react";
import { PokemonContext } from "@contexts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextPokemonId, getPrevPokemonId } from "@utils";

export default function MobileControls() {
	const { currentPokemon, showContent, setPokemonToFetch } = use(PokemonContext);

	const handleNext = () => setPokemonToFetch(getNextPokemonId(currentPokemon));
	const handlePrev = () => setPokemonToFetch(getPrevPokemonId(currentPokemon));

	return (
		<div
			id="mobile-controls"
			className="absolute top-1/3 -translate-y-1/2 w-full flex justify-between px-2 z-40"
		>
			<button
				onClick={handlePrev}
				disabled={!showContent}
				className="custom-hover"
			>
				<ArrowLeft
					color="white"
					size={32}
					cursor="pointer"
				/>
			</button>
			<button
				onClick={handleNext}
				disabled={!showContent}
				className="custom-hover"
			>
				<ArrowRight
					color="white"
					size={32}
					cursor="pointer"
				/>
			</button>
		</div>
	);
}
