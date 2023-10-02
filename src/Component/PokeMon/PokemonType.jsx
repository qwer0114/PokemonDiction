import { useEffect, useState } from "react";

import { typeData } from "../../Data/typeData";
/**포켓몬 타입 리턴하는 */
function PokemonType({ type }) {
  const [typeInfo, setTypeInfo] = useState(
    typeData.filter((t) => t.name === type) // 리턴값이 배열
  );

  useEffect(() => {
    setTypeInfo(typeData.filter((t) => t.name === type));
  }, [type]);

  return (
    <div>
      {typeInfo.map((t, i) => {
        return (
          <div
            key={i}
            className={`w-28 ${t.bg_color} text-white rounded-lg text-center mr-3`}
          >
            {t.KRName}
          </div>
        );
      })}
    </div>
  );
}

export default PokemonType;
