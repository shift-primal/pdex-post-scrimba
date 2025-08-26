import { useState, useEffect } from "react";
import { Loading, HeadTitle, Sprite, InfoCard, DevTools, MobileControls, Menu } from "@components";
import { createPokemon } from "@utils/createdata";

function App() {
	// useStates

	const [currentPokemon, setCurrentPokemon] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);
	const [onLoadData, setOnLoadData] = useState([]);
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

	useEffect(() => {
		const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log("Completed fetching onLoad data");
				setOnLoadData(data.results);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	}, []);

	// ->

	return (
		<>
			<main className="min-h-screen place-content-center bg-gray-950 transition-all">
				{!showContent && <Loading />}
				{(showContent || currentPokemon?.name) && (
					<>
						<div
							className="app-container flex flex-col items-center relative outline-4 p-4 outline-white"
							style={{
								backgroundColor: currentPokemon.colors[currentPokemon.types.first],
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
										onLoadData={onLoadData}
										setPokemonToFetch={setPokemonToFetch}
										setMenuOpen={setMenuOpen}
										menuOpen={menuOpen}
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
