import ProgressBar from "@ramonak/react-progress-bar";
import { typeColors } from "../../utils";

export default function StatMeter({ pokemon, value }) {
	return (
		<ProgressBar
			completed={value}
			maxCompleted={(2 * value + 63 + 31 + 5) * 0.5}
			height="1rem"
			isLabelVisible={false}
			bgColor={typeColors[pokemon.types.first]}
			transitionDuration="500ms"
		/>
	);
}
