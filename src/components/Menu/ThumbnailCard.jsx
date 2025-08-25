import { capitalize } from "../../utils/format";

export default function ThumbnailCard({ name, handleClick }) {
	return (
		<button
			onClick={() => {
				handleClick(name);
			}}
			className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center cursor-pointer"
		>
			<h3>{capitalize(name)}</h3>
		</button>
	);
}
