export function capitalize(input) {
	return input.slice(0, 1).toUpperCase() + input.slice(1);
}

export function formatId(id) {
	if (id < 10) {
		return `00${id}`;
	}
	if (id >= 10 && id < 100) {
		return `0${id}`;
	}
	if (id >= 100) {
		return `${id}`;
	}
}

export function formatWeight(weight) {
	return `${weight / 10}kg`;
}

export function formatHeight(height) {
	return `${height / 10}m`;
}

export function formatFlavorText(flavorText) {
	return flavorText
		.replace(/\n/g, " ")
		.replace(/\bPOK[ÉE]MON\b/gi, "Pokémon")
		.replace(/\b[A-Z]{3,}\b/g, (word) => word.charAt(0) + word.slice(1).toLowerCase())
		.replace(/\s+/g, " ")
		.trim();
}

export function findEnglishEntry(entries) {
	const english = entries.find((e) => e.language.name === "en");
	if (!english) return "";

	return english.flavor_text;
}
