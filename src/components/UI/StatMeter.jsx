import ProgressBar from "@ramonak/react-progress-bar";

export default function StatMeter({ pokemon, value }) {
	return (
		<div className="col-start-4 col-end-10 w-full">
			<ProgressBar
				completed={value}
				maxCompleted={(2 * value + 63 + 31 + 5) * 0.5}
				height="1rem"
				isLabelVisible={false}
				bgColor={pokemon.colors[pokemon.types.first]}
			/>
		</div>
	);
}
