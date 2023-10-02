import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { useEffect, useState } from "react";
import { convertKorean } from "../../Utilities/convertKorea";
function PokeMonAbility({ ability_url, text }) {
  const fetch = useFetch(`${ability_url}`);
  const { data } = useAPI(["pokemonAbility", ability_url], fetch);
  console.log(ability_url);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    let krName = convertKorean(data?.names);
    if (krName) setName(krName[0]?.name);

    let krDescription = convertKorean(data?.flavor_text_entries);
    if (krDescription) setDescription(krDescription[0]?.flavor_text);
  }, [data]);

  return (
    <div className="flex flex-col pr-24">
      <div className="text-slate-500">{text}</div>
      <div className="flex">
        <div className="mr-3">{name}</div>
        {/* <div className="bg-black text-white rounded-lg p-2">{description}</div> */}
        <div className="rounded-full font-bold bg-black text-white w-6 text-center px-1 cursor-pointer">
          ?
        </div>
      </div>
    </div>
  );
}

export default PokeMonAbility;
