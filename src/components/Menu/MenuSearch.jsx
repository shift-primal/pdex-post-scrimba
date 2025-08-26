export default function MenuSearch() {
	return (
		<form /* action={handleForm} */>
			<input
				type="text"
				name="newPokemon"
				placeholder="Search pokemon..."
				className="min-w-50 h-full border-2 rounded-md focus:outline-none p-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background hover:bg-gray-100 focus:bg-gray-200"
			/>
		</form>
	);
}
