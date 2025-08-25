import { capitalize, formatId } from "../../utils/format";

export default function ThumbnailCard({ name, id, setPokemonToFetch, setMenuOpen }) {
	return (
		<button
			onClick={() => {
				setPokemonToFetch(name);
				setMenuOpen(false);
			}}
			className="bg-white rounded-lg h-20 flex flex-col items-center justify-center cursor-pointer"
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
