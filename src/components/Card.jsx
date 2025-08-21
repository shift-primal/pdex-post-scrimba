import { Fragment } from "react";
import { capitalize, formatEnglishFlavorText } from "../utils/format";

export default function Card({ cardData }) {
  return (
    <section
      id="card"
      className="w-full h-[725px] bg-white rounded-2xl text-foreground pt-30 flex flex-col gap-y-8"
    >
      <div
        id="types"
        className="flex justify-evenly px-32"
      >
        {Object.entries(cardData.types).map((type) => {
          if (type[1]) {
            return (
              <span
                key={type}
                className="w-[100px] h-[40px] flex justify-center items-center text-xl text-white font-bold rounded-4xl"
                style={{ backgroundColor: `${cardData.colors[type[1]]}` }}
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
          color: `${cardData.colors[cardData.types.firstType]}`,
        }}
      >
        About
      </h3>
      <div
        id="biometrics"
        className="grid grid-cols-3 place-items-center px-4"
      >
        {cardData.biometrics.map((metric) => {
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
        className="px-16 leading-8 text-lg font-medium"
      >
        {formatEnglishFlavorText(cardData.species.flavor_text_entries)}
      </div>
      <div
        id="stats"
        className="px-8"
      >
        <h1
          className="text-2xl font-bold"
          style={{ color: `${cardData.colors[cardData.types.firstType]}` }}
        >
          Base Stats
        </h1>
        <div className="grid grid-cols-3 place-items-center max-w-40">
          {cardData.stats.map((stat, i) => {
            return (
              <Fragment key={stat.name}>
                <span className="w-full text-right font-bold">{stat.name}</span>
                <span className="border-l-2 opacity-20 h-full"></span>
                <span className="w-full text-left font-semibold">
                  {`0${stat.value}`}
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
