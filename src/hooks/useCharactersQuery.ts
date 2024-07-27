import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../services";

interface Options {
  id?: string;
  limit?: number;
}

const useCharactersQuery = ({ id, limit = 1 }: Options) => {
  const {
    data: characters = [],
    isLoading,
    isError,
    error,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["characters", id ?? {}, limit],
    queryFn: async () => await getCharacter(id, limit),
    staleTime: 1000 * 60 * 60,
  });

  return { error, characters, isLoading, isError, isFetching, isFetched };
};

export default useCharactersQuery;
