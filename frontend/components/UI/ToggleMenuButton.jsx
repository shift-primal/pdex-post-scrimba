import { use } from "react";
import { PokemonContext } from "@contexts";
import { ChevronDown } from "lucide-react";

export default function ToggleMenuButton() {
	const { menuOpen, setMenuOpen } = use(PokemonContext);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<button
			className="cursor-pointer absolute left-10 top-10 custom-hover z-40"
			onClick={toggleMenu}
		>
			<ChevronDown
				size={36}
				color={"white"}
				className={`transition-transform duration-100 ease-out ${menuOpen ? "rotate-180" : ""}`}
			/>
		</button>
	);
}
