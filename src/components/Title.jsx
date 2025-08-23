import { ArrowLeft } from "lucide-react";
import { capitalize, formatId } from "../utils/format";

export default function Title({ pokemon }) {
	return (
		<section
			id="title"
			className="h-20 flex items-center justify-around w-full my-4 text-white"
		>
			<button>
				<ArrowLeft size={32} />
			</button>
			<h1 className="text-4xl leading-8 font-semibold">{capitalize(pokemon.name)}</h1>
			<h2 className="text-3xl leading-4 font-bold">#{formatId(pokemon.id)}</h2>
		</section>
	);
}
