import { useQuery } from "@tanstack/react-query";
import { getComicsByCharacter } from "../services/getCharacterComic";

interface Options {
  id: string;
}

const useCharactersComicQuery = ({ id }: Options) => {
  const {
    data: characters = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["comics_by_character", id],
    queryFn: async () => await getComicsByCharacter(id),
    staleTime: 1000 * 60 * 60,
  });

  return { error, characters, isLoading, isError, isFetching };
};

export default useCharactersComicQuery;
