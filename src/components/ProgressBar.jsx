export default function ProgressBar({ value }) {
	return (
		<div className="col-start-4 col-end-10 w-full">
			<meter
				min={0}
				max={(2 * value + 63 + 31 + 5) * 0.6}
				value={value}
				className="w-full"
			></meter>
		</div>
	);
}
