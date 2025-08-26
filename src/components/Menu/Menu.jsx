import { useState, useEffect, useRef } from "react";
import MenuCard from "./MenuCard";
import MenuSearch from "./MenuSearch";

export default function Menu({ onLoadData, setPokemonToFetch, setMenuOpen, menuOpen }) {
	// States

	const [displayedPokemon, setDisplayedPokemon] = useState([]);
	const [displayBookmark, setDisplayBookmark] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");

	// Refs

	const menuRef = useRef(null);
	const isLoadingRef = useRef(false);

	// useEffects

	useEffect(() => {
		if (searchQuery) {
			const filteredPokemon = onLoadData
				.filter((el) => el != null)
				.filter((el) => el.name && el.name.toLowerCase().includes(searchQuery.toLowerCase()));

			setDisplayedPokemon(filteredPokemon);
		} else {
			setDisplayedPokemon(onLoadData.slice(0, 50));
		}
	}, [searchQuery]);

	useEffect(() => {
		if (displayBookmark === 0) {
			setDisplayedPokemon(onLoadData.slice(0, 50));
		} else {
			const nextBatch = onLoadData.slice(displayBookmark * 50, (displayBookmark + 1) * 50);
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
		return (
			<MenuCard
				name={el.name}
				id={el.url ? el.url.split("/").slice(-2, -1)[0] : index + 1}
				key={el.name}
				setPokemonToFetch={setPokemonToFetch}
				setMenuOpen={setMenuOpen}
			/>
		);
	});

	return (
		<div
			id="menu"
			className="w-full h-full overflow-y-hidden flex flex-col"
		>
			<div
				id="header"
				className="py-8"
			>
				<h1 className="text-3xl">Pokémon</h1>
			</div>

			<div
				id="cards-grid"
				className="grid grid-cols-2 place-content-start gap-4 overflow-y-scroll flex-1 px-4"
				ref={menuRef}
			>
				{cardElements}
			</div>
			<div
				id="footer"
				className="py-4"
			>
				<MenuSearch setSearchQuery={setSearchQuery} />
			</div>
		</div>
	);
}
