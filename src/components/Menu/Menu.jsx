import { useState, useEffect, useRef } from "react";
import MenuCard from "./MenuCard";
import MenuHeader from "./MenuHeader";
import MenuSearch from "./MenuSearch";

export default function Menu({ onLoadData, setPokemonToFetch, setMenuOpen, menuOpen }) {
	// States

	const [displayedPokemon, setDisplayedPokemon] = useState([]);
	const [displayBookmark, setDisplayBookmark] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// Refs

	const menuRef = useRef(null);
	const isLoadingRef = useRef(false);

	// useEffects

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

				// console.log("Scroll event fired, isLoadingRef: ", isLoadingRef.current);
				// console.log("Remaining pixels: ", remaining);

				if (remaining > 500 && isLoadingRef.current) {
					isLoadingRef.current = false;
				}

				if (remaining < 300 && !isLoadingRef.current) {
					// console.log("Starting to load next pokemon.. - setting isLoadingRef to true");
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

	const cardElements = displayedPokemon.map((pokemon, i) => {
		return (
			<MenuCard
				name={pokemon.name}
				id={i + 1}
				key={i}
				setPokemonToFetch={setPokemonToFetch}
				setMenuOpen={setMenuOpen}
			/>
		);
	});

	return (
		<div
			id="menu"
			className="w-full p-4 h-full overflow-y-hidden flex flex-col"
		>
			<MenuHeader />
			<div
				id="cards-grid"
				className="grid grid-cols-2 gap-4 overflow-y-scroll flex-1"
				ref={menuRef}
			>
				{cardElements}
			</div>
			<div className="">
				<MenuSearch />
			</div>
		</div>
	);
}
