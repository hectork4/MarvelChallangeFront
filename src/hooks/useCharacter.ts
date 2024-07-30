import { useContext, useEffect, useState } from "react";
import { Character } from "../interfaces/Character";
import useCharactersQuery from "./useCharactersQuery";
import UserContext from "../context/UserContext";

/* El estado de limit y el efecto de cambiarlo según caracteres se creó por la dificultad que se observó en algunas
ocaciones con la api de marvel. En muchas oportunidades mientras se trabajaba, daba un error de timeout con limit en
más de 30. Como 50 no son muchos como para copar la pantalla entera y hacer un infinityScroll observando si baja el
cursor para saber si lanzar de nuevo la petición, se optó por una carga en partes de 25 hasta llegar a 50. De
esta forma se observó que se resolvió el problema con este "parche". Si para una cantidad de limit la operación falla,
al menos habrá cargado los personajes hasta el anterior limit donde fue posible ejecutar la operación */

export function useCharacter(id?: string) {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [filterWord, setFilterWord] = useState<string>("");
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);
  const { handleLimit, limit: lastSuccesed } = useContext(UserContext);
  const [limit, setLimit] = useState(lastSuccesed);

  const { characters, isLoading, isFetched, isError } = useCharactersQuery({
    id,
    limit,
  });

  useEffect(() => {
    !!characters.length && setLocalCharacters(characters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters.length]);

  useEffect(() => {
    if (isFetched && characters.length <= 50 && !id && lastSuccesed !== 50) {
      handleLimit(limit);
      setLimit(50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  useEffect(() => {
    filterWord
      ? setFilteredCharacters(
          localCharacters.filter(
            (character: Character) =>
              filterWord &&
              character.name.toLowerCase().includes(filterWord.toLowerCase()) &&
              character
          )
        )
      : setFilteredCharacters(localCharacters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterWord]);

  const handleFilter = (word: string) => {
    setFilterWord(word);
  };

  return {
    loading: isLoading,
    characters: !!filterWord ? filteredCharacters : localCharacters,
    handleFilter,
    filterWord,
    isError,
  };
}
