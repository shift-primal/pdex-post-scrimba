import { use } from "react";
import { PokemonContext } from "@contexts";
import { capitalize, formatId } from "@utils";

export default function MenuCard({ name, id }) {
	const { setPokemonToFetch, setMenuOpen } = use(PokemonContext);
	return (
		<button
			onClick={() => {
				setPokemonToFetch(name);
				setMenuOpen(false);
			}}
			className="bg-white rounded-lg h-22 flex flex-col items-center justify-center cursor-pointer border-2 custom-hover"
		>
			<h3
				id="id"
				className="text-2xl"
			>
				#{formatId(id)}
			</h3>
			<h4 id="name">{capitalize(name)}</h4>
		</button>
	);
}
