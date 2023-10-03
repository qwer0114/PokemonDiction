import { async } from "q";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokemonInfoCard from "../PokeMon/PokemonInfoCard";
import PoketmonCard from "../PokeMon/PoketmonCard";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import Navigation from "../Navigation";
const style = {
  layout: "",
  krName: "pl-5 pb-1 pt-1  text-4xl font-bold",
};

function PokemonDetail() {
  let { id } = useParams();

  const [weigth, setWeight] = useState();
  const [height, setHeight] = useState();
  const [ability, setAbility] = useState();
  const [hiddenAbility, setHiddenAbility] = useState();
  const [url, setUrl] = useState();
  const fetch = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { data } = useAPI(["pokeInfo", id], fetch);

  useEffect(() => {
    setWeight(data?.weight);
    setHeight(data?.height);
    setUrl(data?.species.url);
    let abil = data?.abilities.filter((a) => a.is_hidden === false);
    let hiddenAbil = data?.abilities.filter((a) => a.is_hidden === true);
    setAbility(abil);
    setHiddenAbility(hiddenAbil);
  }, [data]);

  return (
    <div>
      <Navigation />
      <div className="w-4/5 m-0 m-auto border-2 mt-12 p-12">
        <div className="flex justify-center">
          <PoketmonCard
            url={`https://pokeapi.co/api/v2/pokemon/${id}`}
            imgStyle={"w-auto"}
            pokeMonName={id}
            style={style}
          />
          {url !== undefined ? (
            <PokemonInfoCard
              weigth={weigth}
              heigth={height}
              species_url={url}
              ability={ability}
              hiddenAbility={hiddenAbility}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
