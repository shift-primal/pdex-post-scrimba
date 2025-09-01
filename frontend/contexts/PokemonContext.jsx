import { createContext, useState, useEffect } from "react";
import createPokemon from "../controllers/createdata";

const PokemonContext = createContext();

export { PokemonContext };

export function PokemonProvider({ children }) {
	const [currentPokemon, setCurrentPokemon] = useState([]);
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonToFetch, setPokemonToFetch] = useState(1);
	const [showContent, setShowContent] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setShowContent(false);
		createPokemon(pokemonToFetch).then((pokemon) => {
			setCurrentPokemon(pokemon);
			setTimeout(() => {
				setShowContent(true);
			}, 500);
		});
	}, [pokemonToFetch]);

	useEffect(() => {
		console.log("Fetching pokemonData...");
		setShowContent(false);
		fetch("http://localhost:3000/pokemon?limit=1025")
			.then((res) => res.json())
			.then((pokemonData) => {
				console.log("Completed fetching pokemon data!");
				setShowContent(true);
				setPokemonData(pokemonData);
			});
	}, []);

	return (
		<PokemonContext.Provider
			value={{
				currentPokemon,
				pokemonData,
				setPokemonToFetch,
				showContent,
				menuOpen,
				setMenuOpen,
				setShowContent,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
}
