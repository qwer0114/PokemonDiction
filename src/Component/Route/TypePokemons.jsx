import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PoketmonCard from "../PokeMon/PoketmonCard";
import Navigation from "../Navigation";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";

const style = {
  layout: "flex flex-col items-start",
  krName: "pl-5 pb-1 pt-1  text-xl font-bold",
};

function TypePokemons() {
  let { id } = useParams();
  const fetch = useFetch(`https://pokeapi.co/api/v2/type/${id}/?limit=20`);
  const { data } = useAPI(["pokemonType", id], fetch);
  const [validate, setValidate] = useState();
  console.log(data);

  useEffect(() => {
    setValidate(new Set(data?.pokemon));
    console.log(data?.pokemon);
  }, [data]);

  return (
    <>
      <Navigation />
      <div className="flex flex-wrap w-4/5 m-0 m-auto">
        {data?.pokemon.map((pokemon, i) => {
          return (
            <PoketmonCard
              url={pokemon.pokemon.url}
              key={i}
              imgStyle={"w-64 border-2"}
              pokeMonName={pokemon.pokemon.name}
              style={style}
            ></PoketmonCard>
          );
        })}
      </div>
    </>
  );
}

export default TypePokemons;
