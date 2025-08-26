export default function MenuSearch({ setSearchQuery }) {
	function handleSearch(e) {
		const searchQuery = e.target.value;
		// console.log(searchQuery);
		setSearchQuery(searchQuery);
	}

	return (
		<input
			type="text"
			onChange={handleSearch}
			placeholder="Search pokemon..."
			className="h-fit w-fit border-2 rounded-lg focus:outline-none p-2 bg-white text-lg"
		/>
	);
}
