import { use } from "react";
import { PokemonContext } from "@contexts";
import { DevTools } from "@components";
import MainApp from "./components/MainApp";

function App() {
	const { currentPokemon } = use(PokemonContext);
	return (
		<>
			<main className="min-h-screen place-content-center bg-gray-950 transition-all z-100">
				{currentPokemon.name ? <MainApp /> : null}
				<DevTools />
			</main>
		</>
	);
}

export default App;
