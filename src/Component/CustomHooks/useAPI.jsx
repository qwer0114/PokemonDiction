import { useQuery, useQueryClient } from "react-query";
export function useAPI(queryName, fetchFunc) {
  return useQuery(queryName, fetchFunc, {
    onError: (e) => {},
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
}
