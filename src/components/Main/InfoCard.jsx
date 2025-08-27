import { Fragment, use } from "react";
import { PokemonContext } from "@contexts";
import { capitalize, formatFlavorText, formatHeight, formatWeight } from "@utils";
import { Ruler, Stars, Weight } from "lucide-react";
import { StatMeter } from "@components";

export default function Card() {
	const { currentPokemon } = use(PokemonContext);

	const biometrics = [
		{ name: "Weight", value: formatWeight(currentPokemon.weight), icon: <Weight /> },
		{ name: "Height", value: formatHeight(currentPokemon.height), icon: <Ruler /> },
		{ name: "Ability", value: capitalize(currentPokemon.mainAbility), icon: <Stars /> },
	];
	return (
		<section
			id="card"
			className="w-full h-[725px] bg-white rounded-2xl text-foreground pt-32 flex flex-col gap-y-6 z-10 custom-shadow"
		>
			<div
				id="types"
				className="flex justify-evenly px-32"
			>
				{Object.entries(currentPokemon.types).map((type) => {
					if (type[1]) {
						return (
							<span
								key={type}
								className="w-[100px] h-[40px] flex justify-center items-center text-xl text-white font-bold rounded-4xl"
								style={{ backgroundColor: `${currentPokemon.colors[type[1]]}` }}
							>
								{capitalize(type[1])}
							</span>
						);
					}
				})}
			</div>
			<h3
				className="font-bold text-2xl"
				style={{
					color: `${currentPokemon.colors[currentPokemon.types.firstType]}`,
				}}
			>
				About
			</h3>
			<div
				id="biometrics"
				className="grid grid-cols-3 place-items-center px-4"
			>
				{biometrics.map((metric) => {
					return (
						<div
							key={metric.name}
							className="flex flex-col gap-y-4"
						>
							<span className="flex gap-x-4 items-center font-medium">
								{metric.icon}
								{metric.value}
							</span>
							<span className="opacity-65 text-sm">{metric.name}</span>
						</div>
					);
				})}
			</div>
			<div
				id="flavor-text"
				className="px-16 leading-8 text-lg font-medium line-clamp-2"
			>
				{formatFlavorText(currentPokemon.flavorText)}
			</div>
			<div
				id="stats"
				className="px-8 flex flex-col gap-y-4"
			>
				<h1
					className="text-2xl font-bold"
					style={{ color: `${currentPokemon.colors[currentPokemon.types.firstType]}` }}
				>
					Base Stats
				</h1>
				<div className="grid grid-cols-9 grid-rows-6 place-items-center mt-2">
					{Object.values(currentPokemon.stats).map((stat) => {
						return (
							<Fragment key={stat.name}>
								<span className="w-full text-right font-bold col-start-1">{stat.name}</span>
								<span className="border-l-2 opacity-20 h-full"></span>
								<span className="w-full text-left font-semibold">{`0${stat.value}`}</span>
								<StatMeter
									pokemon={currentPokemon}
									value={stat.value}
									className="w-full"
								/>
							</Fragment>
						);
					})}
				</div>
			</div>
		</section>
	);
}
