export default function Image({ pokemon, onImageLoad }) {
  return (
    <section
      id="image"
      className="w-[400px] h-[400px] flex justify-center"
    >
      <img
        className="object-contain object-center absolute"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt="Image loading failed"
        onLoad={console.log("Loaded!")}
      />
    </section>
  );
}
