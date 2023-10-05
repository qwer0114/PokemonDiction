import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertKorean } from "../../Utilities/utilFunctions";

function PokemonKRName({ species_url, style, setTotalPokemons, pokeInfo }) {
  const fetch = useFetch(`${species_url}`);
  const { data } = useAPI(["pokemonSpeices", species_url], fetch);
  const [krName, setKRName] = useState();
  useEffect(() => {
    convertKorean(data?.names);
    setKRName(convertKorean(data?.names));
  }, [data]);

  useEffect(() => {
    if (krName !== undefined && setTotalPokemons !== undefined) {
      pokeInfo.krName = krName[0].name;
      setTotalPokemons((total) => total.concat(pokeInfo)); // 한국 이름으로 검색하기 위해서 한국 이름을 추가함
    }
  }, [krName]);

  return <div className={`${style}`}>{krName ? krName[0].name : null}</div>;
}
export default PokemonKRName;
