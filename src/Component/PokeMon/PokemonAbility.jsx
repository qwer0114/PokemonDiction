import useFetch from "../CustomHooks/useFetch";
import { useAPI } from "../CustomHooks/useAPI";
import { useEffect, useState } from "react";
import { convertKorean } from "../../Utilities/convertKorea";

function PokeMonAbility({ ability_url, text }) {
  const fetch = useFetch(`${ability_url}`);
  const { data } = useAPI(["pokemonAbility", ability_url], fetch);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    let krName = convertKorean(data?.names);
    if (krName) setName(krName[0]?.name);

    let krDescription = convertKorean(data?.flavor_text_entries);
    if (krDescription) setDescription(krDescription[0]?.flavor_text);
  }, [data]);

  return (
    <>
      <div className="flex flex-col pr-24">
        <div className="text-slate-500 pb-3">{text}</div>
        <div className="flex">
          <div className="mr-3">{name}</div>
          <div className="relative">
            <div
              className="rounded-full font-bold bg-black text-white w-6 text-center px-1 cursor-pointer"
              onClick={() => {
                setModal(!modal);
              }}
            >
              ?
            </div>
            {modal ? (
              <div className="bg-slate-200 text-black rounded-lg p-2 absolute z-10 w-64 top-0 left-8">
                {description}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeMonAbility;
