export default function Image({ pokemon }) {
	return (
		<section
			id="image"
			className="w-[400px] h-[400px] flex justify-center z-20"
		>
			<img
				className="object-contain object-center absolute"
				src={pokemon.sprite}
				alt="Image loading failed"
			/>
		</section>
	);
}
