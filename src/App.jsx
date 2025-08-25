import { useState, useEffect } from "react";
import { Loading, HeadTitle, Sprite, InfoCard, DevTools, MobileControls, Menu } from "@components";
import { createPokemon } from "@utils/createdata";

function App() {
	// useStates

	const [currentPokemon, setCurrentPokemon] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);
	// const [prevPokemon, setPrevPokemon] = useState([]);
	const [pokemonToFetch, setPokemonToFetch] = useState(1);
	const [showContent, setShowContent] = useState(false);

	// useEffects

	useEffect(() => {
		createPokemon(pokemonToFetch).then((newPokemon) => {
			setCurrentPokemon(newPokemon);
			setShowContent(true);
		});
	}, [pokemonToFetch]);

	// ->

	return (
		<>
			<main className="min-h-screen place-content-center bg-gray-950 transition-all">
				{!showContent && <Loading />}
				{(showContent || currentPokemon?.name) && (
					<>
						<div
							className="app-container flex flex-col items-center relative p-4 outline-4 outline-white"
							style={{
								backgroundColor: currentPokemon.colors[currentPokemon.types.first],
								overflowY: menuOpen ? "scroll" : "hidden",
							}}
						>
							{!menuOpen && (
								<>
									<MobileControls
										pokemon={currentPokemon}
										showContent={showContent}
										setPokemonToFetch={setPokemonToFetch}
									/>
									<HeadTitle pokemon={currentPokemon} />
									<Sprite pokemon={currentPokemon} />
									<InfoCard pokemon={currentPokemon} />
								</>
							)}
							{menuOpen && (
								<>
									<Menu
										setPokemonToFetch={setPokemonToFetch}
										setMenuOpen={setMenuOpen}
									/>
								</>
							)}
						</div>
					</>
				)}
				<DevTools
					pokemon={currentPokemon}
					showContent={showContent}
					setPokemonToFetch={setPokemonToFetch}
					setMenuOpen={setMenuOpen}
				/>
			</main>
		</>
	);
}

export default App;
