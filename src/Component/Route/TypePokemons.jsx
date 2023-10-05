import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PoketmonCard from "../PokeMon/PoketmonCard";
import Navigation from "../Navigation";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { throttle } from "lodash";
import { division } from "../../Utilities/utilFunctions";
const style = {
  layout: "flex flex-col items-start",
  krName: "pl-5 pb-1 pt-1  text-xl font-bold",
};

function TypePokemons() {
  let { id } = useParams();
  const fetch = useFetch(`https://pokeapi.co/api/v2/type/${id}/`);
  const { data } = useAPI(["pokemonType", id], fetch);
  const [pokemonArray, setPokemonArray] = useState();
  const [pokemons, setPokemons] = useState();
  let [count, setCount] = useState(0);

  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (pokemonArray?.length - 1 > count) {
        setCount(++count);
      }
    }
  }, 300);

  useEffect(() => {
    setCount(0);
    if (data !== undefined) {
      const arr = division(data.pokemon, 20);
      setPokemonArray(arr);
    }
    // 처음 받아온 배열을 20개씩 작은 배열로 분할하여 pokemonArray에 저장
  }, [data]);

  useEffect(() => {
    setPokemons(pokemonArray !== undefined ? pokemonArray[0] : undefined);
    // pokemons의 초기값은 pokemonArray의 첫번째
  }, [pokemonArray]);

  useEffect(() => {
    if (pokemons !== undefined) {
      setPokemons((pokeomons) => pokeomons.concat(pokemonArray[count]));
      // 스크롤을 내려 카운트가 증가하면 기존 pokemons와 pokemonArray의 다음 인덱스에 있는 포케몬들이 들어감
    }
  }, [count]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  console.log(pokemonArray);
  return (
    <>
      <Navigation />
      <div className="flex flex-wrap w-4/5 m-0 m-auto">
        {pokemons !== undefined
          ? pokemons.map((pokemon, i) => {
              return (
                <PoketmonCard
                  url={pokemon.pokemon.url}
                  key={i}
                  imgStyle={"w-64 border-2"}
                  pokeMonName={pokemon.pokemon.name}
                  style={style}
                ></PoketmonCard>
              );
            })
          : null}
      </div>
    </>
  );
}

export default TypePokemons;
