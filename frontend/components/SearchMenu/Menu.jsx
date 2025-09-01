import { useState, useEffect, useRef, use } from "react";
import { MenuCard, MenuSearch } from "@components";
import { PokemonContext } from "@contexts";

export default function Menu() {
	const { pokemonData, menuOpen } = use(PokemonContext);

	// States

	const [displayedPokemon, setDisplayedPokemon] = useState([]);
	const [displayBookmark, setDisplayBookmark] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	// Refs

	const menuRef = useRef(null);
	const isLoadingRef = useRef(false);

	// useEffects

	useEffect(() => {
		if (searchQuery) {
			console.log(displayedPokemon);
			const filteredPokemon = pokemonData
				.filter((el) => el != null)
				.filter((el) => el.name && el.name.toLowerCase().includes(searchQuery.toLowerCase()));

			setDisplayedPokemon(filteredPokemon);
		} else {
			setDisplayedPokemon(pokemonData.slice(0, 50));
		}
	}, [searchQuery]);

	useEffect(() => {
		if (displayBookmark === 0) {
			setDisplayedPokemon(pokemonData.slice(0, 50));
		} else {
			const nextBatch = pokemonData.slice(displayBookmark * 50, (displayBookmark + 1) * 50);
			setDisplayedPokemon((prev) => [...prev, ...nextBatch]);
		}
	}, [displayBookmark]);

	useEffect(() => {
		if (menuOpen && menuRef.current) {
			const handleScroll = () => {
				const scrollableArea = menuRef.current.scrollHeight - menuRef.current.clientHeight;
				const remaining = scrollableArea - menuRef.current.scrollTop;

				if (remaining > 500 && isLoadingRef.current) {
					isLoadingRef.current = false;
				}

				if (remaining < 300 && !isLoadingRef.current) {
					isLoadingRef.current = true;
					setDisplayBookmark((prev) => prev + 1);
				}
			};

			menuRef.current.addEventListener("scroll", handleScroll);

			return () => {
				if (menuRef.current) {
					menuRef.current.removeEventListener("scroll", handleScroll);
				}
			};
		}
	}, [menuOpen]);

	const cardElements = displayedPokemon.map((el) => {
		console.log(el);
		return (
			<MenuCard
				sprite={el.sprite_url}
				type={el.first_type}
				name={el.name}
				id={el.id}
				key={el.name}
			/>
		);
	});

	return (
		<div
			id="menu-container"
			className="w-full relative overflow-y-hidden flex flex-col"
		>
			<div
				id="header"
				className="h-20 px-8 my-4 flex items-center justify-center"
			>
				<h1 className="text-4xl text-white">Pokémon</h1>
			</div>

			<div
				id="cards-grid"
				className="grid grid-cols-2 place-content-start gap-4 overflow-y-scroll flex-1 px-4 my-2"
				ref={menuRef}
			>
				{cardElements}
			</div>
			<div id="footer">
				<MenuSearch setSearchQuery={setSearchQuery} />
			</div>
		</div>
	);
}
