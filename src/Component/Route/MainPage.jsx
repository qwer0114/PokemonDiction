import { useEffect, useRef, useState } from "react";
import PoketmonCard from "../PokeMon/PoketmonCard";
import Navigation from "../Navigation";
import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { throttle } from "lodash";
const style = {
  layout: "flex flex-col items-start",
  krName: "pl-5 pb-1 pt-1  text-xl font-bold",
};

function Pokemons() {
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
  const fetch = useFetch(`${url}`);
  const { data, refetch } = useAPI(["pokemon"], fetch);
  const [pokemons, setPokemons] = useState();
  let [input, setInput] = useState(null);
  let [inputResult, setInputResult] = useState(["1"]);
  const [totalPokemons, setTotalPokemons] = useState([]);
  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setUrl(data?.next);
    }
  }, 300);

  // 스크롤 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // url 바뀌면 reFetch
  useEffect(() => {
    refetch();
  }, [url]);

  useEffect(() => {
    if (pokemons !== undefined) {
      setPokemons((pokeomons) => pokeomons.concat(data?.results));
    } else {
      setPokemons(data?.results);
    }
    setTotalPokemons([]);
    setInput(null);
  }, [data]);

  // input 변경 감지
  useEffect(() => {
    if (totalPokemons.length !== 0) {
      console.log(totalPokemons);
      setInputResult(
        totalPokemons.filter((pokemon) => pokemon.krName.includes(input))
      );
    }
  }, [input]);

  return (
    <>
      <Navigation />
      <input
        type="text"
        className="border-2"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <div className="flex flex-wrap w-4/5 m-0 m-auto">
        {pokemons !== undefined && input === null // input 값이 null 상태라면 모든 포케몬을 다 보여줌
          ? pokemons.map((pokemon, i) => {
              return (
                <PoketmonCard
                  url={pokemon.url}
                  key={i}
                  imgStyle={"w-64 border-2"}
                  pokeMonName={pokemon.name}
                  style={style}
                  setTotalPokemons={setTotalPokemons}
                ></PoketmonCard>
              );
            })
          : inputResult.map((reuslt, i) => {
              return (
                <PoketmonCard
                  url={reuslt.url}
                  imgStyle={"w-64 border-2"}
                  pokeMonName={reuslt.pokeMonName}
                  style={style}
                  key={i}
                ></PoketmonCard>
              );
            })}
      </div>
    </>
  );
}

export default Pokemons;
