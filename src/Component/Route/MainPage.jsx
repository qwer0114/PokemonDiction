import { useEffect, useRef, useState } from "react";
import PoketmonCard from "../PokeMon/PoketmonCard";
import Navigation from "../Navigation";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
const style = {
  layout: "flex flex-col items-start",
  krName: "pl-5 pb-1 pt-1  text-xl font-bold",
};

function Pokemons() {
  const fetch = useFetch(`https://pokeapi.co/api/v2/pokemon/?limit=30`);
  const { data } = useAPI(["pokemon"], fetch);

  return (
    <>
      <div>
        <Navigation />
        <div className="flex flex-wrap w-4/5 m-0 m-auto">
          {data?.results.map((data, i) => {
            return (
              <PoketmonCard
                url={data.url}
                key={i}
                imgStyle={"w-64 border-2"}
                pokeMonName={data.name}
                style={style}
              ></PoketmonCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Pokemons;
