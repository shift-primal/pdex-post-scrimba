import { Fragment, use } from "react";
import { PokemonContext } from "@contexts";
import { capitalize, formatFlavorText, formatHeight, formatWeight } from "@utils";
import { Gauge, Heart, Ruler, Shield, ShieldPlus, Stars, Sword, Swords, Weight } from "lucide-react";
import { StatMeter } from "@components";
import { typeColors } from "../../utils";

export default function Card() {
	const { currentPokemon } = use(PokemonContext);

	const biometricsIcons = {
		weight: <Weight />,
		height: <Ruler />,
		mainability: <Stars />,
	};

	console.log(currentPokemon.stats);

	const statsIcons = {
		hp: <Heart size={20} />,
		atk: <Sword size={20} />,
		def: <Shield size={20} />,
		satk: <Swords size={20} />,
		sdef: <ShieldPlus size={20} />,
		spd: <Gauge size={20} />,
	};

	return (
		<section
			id="card"
			className="w-full h-[725px] bg-gradient-to-b from-white to-gray-100 rounded-2xl text-foreground pt-20 flex flex-col gap-y-6 z-10 custom-shadow inset-shadow-sm inset-shadow-gray-300"
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
								style={{ backgroundColor: `${typeColors[type[1]]}` }}
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
					color: `${typeColors[currentPokemon.types.first]}`,
				}}
			>
				About
			</h3>
			<div
				id="biometrics"
				className="grid grid-cols-3 place-items-center px-4"
			>
				{Object.values(currentPokemon.biometrics).map((metric) => {
					return (
						<div
							key={metric.name}
							className="flex flex-col gap-y-4"
						>
							<span className="flex gap-x-4 items-center font-medium">
								{biometricsIcons[metric.name.replaceAll(" ", "").toLowerCase()]}
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
				className="px-8"
			>
				<h1
					className="text-2xl font-bold"
					style={{ color: `${typeColors[currentPokemon.types.first]}` }}
				>
					Base Stats
				</h1>
				<div className="grid grid-cols-[auto_min-content_min-content_1fr] gap-y-2 py-8 w-full items-center">
					{Object.values(currentPokemon.stats).map((stat) => (
						<Fragment key={stat.name}>
							{/* Icon + label */}
							<div className="flex items-center gap-x-2 font-bold">
								{statsIcons[stat.name.toLowerCase()]}
								<span>{stat.name}</span>
							</div>

							{/* Divider */}
							<div className="w-px h-6 bg-gray-300 justify-self-center ml-3" />

							{/* Value */}
							<span className="font-semibold w-12 text-right mr-8">{stat.value.toString().padStart(3, "0")}</span>

							{/* Stat bar */}
							<StatMeter
								pokemon={currentPokemon}
								value={stat.value}
							/>
						</Fragment>
					))}
				</div>
			</div>
		</section>
	);
}
