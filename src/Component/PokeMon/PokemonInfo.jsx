import { useState } from "react";

function PokemonInfo({ text, data, style }) {
  return (
    <div className={`${style} pr-24`}>
      <div className="text-slate-500 pb-3">{text}</div>
      <div className="">{data}</div>
    </div>
  );
}

export default PokemonInfo;
