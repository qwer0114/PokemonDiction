import { async } from "q";
import { useEffect, useState } from "react";

/**react-query Fucntion 자리에 들어갈 함수 반환하는 함수 */
function useFetch(url) {
  const getFetch = async () => {
    const response = await fetch(`${url}`);
    const json = await response.json();

    return json;
  };

  return getFetch;
}

export default useFetch;
