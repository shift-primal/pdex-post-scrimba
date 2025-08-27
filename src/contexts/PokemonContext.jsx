import { createContext, useState, useEffect } from "react";
import { createPokemon } from "@utils";

const PokemonContext = createContext();

export { PokemonContext };

export function PokemonProvider({ children }) {
	const [currentPokemon, setCurrentPokemon] = useState([]);
	const [onLoadData, setOnLoadData] = useState([]);
	const [pokemonToFetch, setPokemonToFetch] = useState(1);
	const [showContent, setShowContent] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		createPokemon(pokemonToFetch).then(async (newPokemon) => {
			setShowContent(false);
			// await new Promise((resolve) => setTimeout(resolve, 500));
			setCurrentPokemon(newPokemon);
			setShowContent(true);
		});
	}, [pokemonToFetch]);

	useEffect(() => {
		console.log("Fetching onLoadData...");
		setShowContent(false);
		const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
		fetch(url)
			.then((res) => res.json())
			.then(async (data) => {
				console.log("Completed fetching onLoad data!");
				setShowContent(true);
				setOnLoadData(data.results);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	}, []);

	return (
		<PokemonContext.Provider
			value={{ currentPokemon, onLoadData, setPokemonToFetch, showContent, menuOpen, setMenuOpen, setShowContent }}
		>
			{children}
		</PokemonContext.Provider>
	);
}
