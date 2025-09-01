export default function MenuSearch({ setSearchQuery }) {
	const handleSearch = (e) => {
		const searchQuery = e.target.value;
		setSearchQuery(searchQuery);
	};

	return (
		<input
			type="text"
			onChange={handleSearch}
			placeholder="Search pokemon..."
			className="border-2 p-3 rounded-lg focus:outline-none  bg-white text-lg custom-hover"
		/>
	);
}
