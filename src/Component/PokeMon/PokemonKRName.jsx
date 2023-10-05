import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertKorean } from "../../Utilities/utilFunctions";

function PokemonKRName({ species_url, style }) {
  const fetch = useFetch(`${species_url}`);
  const { data } = useAPI(["pokemonSpeices", species_url], fetch);
  const [krName, setKRName] = useState();
  useEffect(() => {
    convertKorean(data?.names);
    setKRName(convertKorean(data?.names));
  }, [data]);

  return <div className={`${style}`}>{krName ? krName[0].name : null}</div>;
}
export default PokemonKRName;
