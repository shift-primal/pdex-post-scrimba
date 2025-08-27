import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextPokemonId, getPrevPokemonId } from "@utils/controls";

export default function MobileControls({ pokemon, showContent, setPokemonToFetch }) {
	// functions

	const handleNext = () => setPokemonToFetch(getNextPokemonId(pokemon));
	const handlePrev = () => setPokemonToFetch(getPrevPokemonId(pokemon));

	return (
		<div
			id="mobile-controls"
			className="absolute top-1/3 -translate-y-1/2 w-full flex justify-between px-8 z-50"
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
