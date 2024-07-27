import { useCharacter } from "./useCharacter";
import useCharactersComicQuery from "./useCharactersComicQuery";

export default function useSingleCharacter({ id }: { id: string }) {
  const {
    characters,
    loading: isCharacterLoading,
    isError: isCharacterError,
  } = useCharacter(id);

  const {
    characters: comics,
    isError: isComicsError,
    isLoading: isComicsLoading,
  } = useCharactersComicQuery({ id });

  const formatedComics = comics.map((comic) => {
    return {
      title: comic.title,
      description: comic.description,
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
    };
  });

  return {
    character: characters[0],
    isCharacterLoading,
    isComicsLoading,
    formatedComics,
    isComicsError,
    isCharacterError,
  };
}
