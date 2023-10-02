import { useEffect, useRef, useState } from "react";
import PokemonImage from "./PokemonImage";
import PokemonType from "./PokemonType";
import PokemonKRName from "./PokemonKRName";
import { useNavigate } from "react-router";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
function PoketmonCard({ url, imgStyle, pokeMonName, style }) {
  const [pokeType, setPokeType] = useState([]);
  const [pokemonID, setPokemonID] = useState();
  const [speciesUrl, setSpeciesUrl] = useState();
  const [pokemonImage, setpokemonImage] = useState([]);

  const navigate = useNavigate();
  const fetch = useFetch(`${url}`);
  const { data } = useAPI(["pokeInfo", pokeMonName], fetch);
  console.log(data);
  useEffect(() => {
    setPokeType(data?.types);
    setSpeciesUrl(data?.species.url);
    setpokemonImage(data?.sprites.other["official-artwork"].front_default);
    setPokemonID(data?.id);
  }, [data]);

  return (
    <>
      <div
        onClick={() => {
          navigate(`/pokemon/${pokeMonName}`);
        }}
      >
        {pokemonImage !== null ? (
          <>
            <div className={`${style?.layout}`}>
              <PokemonImage
                image={pokemonImage}
                imgStyle={imgStyle}
              ></PokemonImage>
              <div className="pb-5">
                <div className="text-slate-400 self-start pl-5">
                  No.{String(pokemonID).padStart(5, "0")}
                </div>
                {speciesUrl !== undefined ? (
                  <PokemonKRName
                    species_url={speciesUrl}
                    pokeMonName={pokeMonName}
                    style={style.krName}
                  ></PokemonKRName>
                ) : null}
                <div className="flex pl-5">
                  {pokeType?.map((type, i) => {
                    return (
                      <PokemonType type={type.type.name} key={i}></PokemonType>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PoketmonCard;
