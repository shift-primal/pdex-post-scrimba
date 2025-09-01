import { use } from "react";
import { PokemonContext } from "@contexts";

export default function Image() {
	const { currentPokemon } = use(PokemonContext);

	return (
		<section
			id="image"
			className="w-[400px] h-[400px] flex justify-center z-20"
		>
			<img
				className="object-contain object-center absolute top-1/16 drop-shadow-[12px_6px_0px_rgba(0,0,0,0.2)] "
				src={currentPokemon.sprite}
				alt="Image loading failed"
			/>
		</section>
	);
}
