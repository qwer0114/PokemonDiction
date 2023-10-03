import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import PoketmonCard from "./PoketmonCard";
import { useEffect, useState } from "react";

const style = {
  layout: "",
  krName: "pl-5 pb-1 pt-1  text-xl font-bold",
};

function PokemonEvolution({ evolution_url }) {
  const fetch = useFetch(`${evolution_url}`);
  const { data } = useAPI(["pokemonSpeices", evolution_url], fetch);
  const [id, setIDs] = useState([]);
  const [name, setNames] = useState([]);
  console.log(data);
  useEffect(() => {
    let url1 = data?.chain.species.url;
    let url2 = data?.chain.evolves_to[0]?.species.url;
    let url3 = data?.chain.evolves_to[0]?.evolves_to[0]?.species.url;
    let name1 = data?.chain.species.name;
    let name2 = data?.chain.evolves_to[0]?.species.name;
    let name3 = data?.chain.evolves_to[0]?.evolves_to[0]?.species.name;

    if (url1 !== undefined) {
      let ids = [
        url1?.split("/", 7)[6],
        url2?.split("/", 7)[6],
        url3?.split("/", 7)[6],
      ];
      let names = [name1, name2, name3];
      setIDs(ids.filter((id) => id !== undefined));
      setNames(names.filter((name) => name !== undefined));
    }
  }, [data]);

  console.log(id);
  console.log(name);

  return id.length !== 0 ? (
    <div className="">
      <div className="p-3 font-bold text-xl flex">
        <img src={require(`../../img/pokeball.png`)}></img>
        <div>진화</div>
      </div>
      <div className="flex">
        {id.map((index, i) => {
          return (
            <PoketmonCard
              url={`https://pokeapi.co/api/v2/pokemon/${index}`}
              pokeMonName={name[i]}
              style={style}
              imgStyle={"w-48 border-2"}
            ></PoketmonCard>
          );
        })}
      </div>
    </div>
  ) : null;
}

export default PokemonEvolution;
