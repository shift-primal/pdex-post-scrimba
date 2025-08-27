import { use } from "react";
import { PokemonContext } from "@contexts";
import { Menu, Pokemon, PokeballBackground, ToggleMenuButton, Loading } from "@components";

export default function MainApp() {
	const { currentPokemon, menuOpen, showContent } = use(PokemonContext);
	return (
		<>
			<div
				className="app-container flex flex-col items-center relative outline-4 p-4 outline-white overflow-x-hidden"
				style={{
					backgroundColor: currentPokemon?.types?.first ? currentPokemon.colors[currentPokemon.types.first] : "#AAA67F",
				}}
			>
				{!showContent && <Loading />}
				<ToggleMenuButton />
				<PokeballBackground />
				{menuOpen ? <Menu /> : <Pokemon />}
			</div>
		</>
	);
}
