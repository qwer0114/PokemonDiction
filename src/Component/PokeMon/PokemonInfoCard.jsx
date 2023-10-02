import { useEffect, useState } from "react";
import { convertKorean } from "../../Utilities/convertKorea";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import PokemonInfo from "./PokemonInfo";
import PokeMonAbility from "./PokemonAbility";

function PokemonInfoCard({
  heigth,
  weigth,
  ability,
  hiddenAbility,
  species_url,
}) {
  const fetch = useFetch(`${species_url}`);
  const { data } = useAPI(["pokemonSpeices", species_url], fetch);
  console.log(data);
  const [genera, setGenera] = useState();
  const [gender, setGender] = useState();
  const [description, setDescription] = useState();
  console.log(hiddenAbility);
  useEffect(() => {
    setGender(data?.gender_rate === -1 ? "???" : null);
    setGenera(convertKorean(data?.genera));
    setDescription(convertKorean(data?.flavor_text_entries));
  }, [data]);
  return (
    <div className="w-1/3 flex flex-col justify-evenly">
      {description !== undefined ? (
        <PokemonInfo data={description[0].flavor_text} style={"text-xl"} />
      ) : null}
      <div className="flex flex-wrap border-2">
        <PokemonInfo text={"몸무게"} data={`${weigth / 10}kg`} />
        <PokemonInfo text={"키"} data={`${heigth / 10}m`} />
        {genera !== undefined ? (
          <PokemonInfo text={"분류"} data={genera[0].genus} />
        ) : null}
        <PokemonInfo text={"성별"} data={gender} />
        <div className="flex w-full p-5">
          <PokeMonAbility ability_url={ability[0].ability.url} text={"능력"} />
          {hiddenAbility.length !== 0 ? (
            <PokeMonAbility
              ability_url={hiddenAbility[0].ability.url}
              text={"잠재능력"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PokemonInfoCard;
