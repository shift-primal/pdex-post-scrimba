import { useState, useEffect } from "react";
import { Loading, Sprite, InfoCard, DevTools, MobileControls, Menu } from "@components";
import { createPokemon } from "@utils/createdata";
import { capitalize, formatId } from "@utils/format";
import ToggleMenuButton from "./components/UI/ToggleMenuButton";
import PokeballBackground from "./components/UI/PokeballBackground";

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
		console.log("Fetching onLoadData...");
		const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log("Completed fetching onLoad data!");
				setOnLoadData(data.results);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	}, []);

	//

	return (
		<>
			<main className="min-h-screen place-content-center bg-gray-950 transition-all">
				{!showContent && <Loading />}
				{(showContent || currentPokemon?.name) && (
					<>
						<div
							className="app-container flex flex-col items-center relative outline-4 p-4 outline-white overflow-x-hidden"
							style={{
								backgroundColor: currentPokemon.colors[currentPokemon.types.first],
							}}
						>
							<ToggleMenuButton
								menuOpen={menuOpen}
								setMenuOpen={setMenuOpen}
							/>

							<PokeballBackground />
							{!menuOpen && (
								<>
									<MobileControls
										pokemon={currentPokemon}
										showContent={showContent}
										setPokemonToFetch={setPokemonToFetch}
									/>
									<section
										id="title"
										className="h-20 flex flex-col items-center justify-center w-full mb-2 mt-8 text-white px-8 gap-y-6 z-10"
									>
										<span
											className="text-7xl leading-8 font-semibold brightness-75"
											style={{
												color: currentPokemon.colors[currentPokemon.types.first],
											}}
										>{`#${formatId(currentPokemon.id)}`}</span>
										<span className="text-4xl leading-8 font-semibold">{capitalize(currentPokemon.name)}</span>
									</section>
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
