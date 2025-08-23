import { useState, useEffect } from "react";
import { Loading, Title, Image, Card, Controls } from "./components";
import createPokemon from "./utils/buildPokemon";

function App() {
	// useStates

	const [currentPokemon, setCurrentPokemon] = useState([]);
	const [prevPokemon, setPrevPokemon] = useState([]);
	const [pokemonToFetch, setPokemonToFetch] = useState(1);
	const [showContent, setShowContent] = useState(false);

	// useEffects

	useEffect(() => {
		createPokemon(pokemonToFetch).then((newPokemon) => {
			setCurrentPokemon(newPokemon);
			setShowContent(true);
		});
	}, [pokemonToFetch]);

	return (
		<>
			<main className="min-h-screen place-content-center bg-gray-950 transition-all">
				{!showContent && <Loading />}
				{(showContent || currentPokemon?.name) && (
					<>
						<div
							className="app-container flex flex-col items-center relative p-4 outline-4 outline-white"
							style={{ backgroundColor: currentPokemon.colors[currentPokemon.types.first] }}
						>
							<Title pokemon={currentPokemon} />
							<Image pokemon={currentPokemon} />
							<Card pokemon={currentPokemon} />
						</div>
					</>
				)}
				<Controls
					pokemon={currentPokemon}
					setPokemonToFetch={setPokemonToFetch}
					showContent={showContent}
				/>
			</main>
		</>
	);
}

export default App;
