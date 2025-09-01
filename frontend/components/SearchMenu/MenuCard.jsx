import { use } from "react";
import { PokemonContext } from "@contexts";
import { capitalize, formatId } from "@utils";
import { typeColors } from "../../utils";

export default function MenuCard({ name, id, type, sprite }) {
	const { setPokemonToFetch, setMenuOpen } = use(PokemonContext);
	return (
		<button
			onClick={() => {
				setPokemonToFetch(id);
				setMenuOpen(false);
			}}
			className="rounded-lg h-22 flex items-center cursor-pointer border-2 custom-hover inset-shadow-2xs inset-shadow-black overflow-hidden relative"
			style={{
				backgroundColor: typeColors[type],
			}}
		>
			<div className="absolute flex flex-col text-white backdrop-brightness-75 rounded-xl left-1/2 inset-3">
				<h3
					id="id"
					className="text-2xl font-normal"
				>
					#{formatId(id)}
				</h3>
				<h4
					id="name"
					className="font-semibold text-lg"
				>
					{capitalize(name)}
				</h4>
			</div>
			<img
				className="object-fill w-30 mt-4 drop-shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
				src={sprite}
			/>
		</button>
	);
}
