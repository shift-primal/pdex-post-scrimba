import { use } from "react";
import { PokemonContext } from "@contexts";
import { MobileControls, Sprite, InfoCard } from "@components";
import { formatId, capitalize } from "@utils";

export default function Pokemon() {
	const { currentPokemon } = use(PokemonContext);
	return (
		<div className="flex flex-col items-center relative overflow-x-hidden">
			<MobileControls />
			<section
				id="title"
				className="h-20 flex flex-col items-center justify-center w-full mt-12 text-white px-8 gap-y-6 z-10"
			>
				<span
					className="text-7xl leading-8 font-semibold brightness-75"
					style={{
						color: currentPokemon.colors[currentPokemon.types.first],
					}}
				>{`#${formatId(currentPokemon.id)}`}</span>
				<span className="text-4xl leading-8 font-semibold">{capitalize(currentPokemon.name)}</span>
			</section>
			<Sprite />
			<InfoCard />
		</div>
	);
}
