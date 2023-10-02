import { useState } from "react";

function PokemonInfo({ text, data, style }) {
  console.log(style?.font);
  return (
    <div className={`${style} p-3`}>
      <div className="text-slate-500">{text}</div>
      <div className="">{data}</div>
    </div>
  );
}

export default PokemonInfo;
