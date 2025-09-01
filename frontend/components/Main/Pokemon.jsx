import { use } from "react";
import { PokemonContext } from "@contexts";
import { MobileControls, Sprite, InfoCard } from "@components";
import { formatId, capitalize, typeColors } from "@utils";

export default function Pokemon() {
	const { currentPokemon } = use(PokemonContext);
	return (
		<div className="flex flex-col items-center relative overflow-x-hidden">
			<MobileControls />
			<section
				id="title"
				className="flex flex-col items-center justify-center w-full mt-8 text-white px-8 gap-y-6 z-30 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
			>
				<span
					className="text-7xl leading-8 font-semibold brightness-[70%]"
					style={{
						color: typeColors[currentPokemon.types.first],
					}}
				>{`#${formatId(currentPokemon.id)}`}</span>
				<span className="text-4xl leading-8 font-semibold">{capitalize(currentPokemon.name)}</span>
			</section>
			<Sprite />
			<InfoCard />
		</div>
	);
}
