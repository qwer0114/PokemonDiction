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

  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setUrl(data?.next);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    refetch();
  }, [url]);

  useEffect(() => {
    if (pokemons !== undefined) {
      setPokemons((pokeomons) => pokeomons.concat(data?.results));
    } else {
      setPokemons(data?.results);
    }
  }, [data]);

  return (
    <>
      <div>
        <Navigation />
        <div className="flex flex-wrap w-4/5 m-0 m-auto">
          {pokemons !== undefined
            ? pokemons.map((data, i) => {
                return (
                  <PoketmonCard
                    url={data.url}
                    key={i}
                    imgStyle={"w-64 border-2"}
                    pokeMonName={data.name}
                    style={style}
                  ></PoketmonCard>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default Pokemons;
