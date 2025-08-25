import { useState, useEffect } from "react";
import ThumbnailCard from "./ThumbnailCard";

export default function Menu({ setPokemonToFetch }) {
	// useStates

	const [onLoadData, setOnLoadData] = useState([]);

	// useEffects

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

	const cardElements = onLoadData.map((i) => {
		return (
			<ThumbnailCard
				name={i.name}
				key={i.name}
				handleClick={setPokemonToFetch}
			/>
		);
	});

	return (
		<div
			id="menu"
			className="grid grid-cols-3 gap-4"
		>
			{cardElements}
		</div>
	);
}
