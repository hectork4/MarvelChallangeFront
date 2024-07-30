import CharacterComponent from "../Character";
import "./styles.css";
import { Character } from "../../interfaces/Character";

export default function CharactersList({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="characters-list">
      {characters?.map((character) => {
        return (
          <CharacterComponent
            key={character.id}
            title={character.name}
            url={character.thumbnail.path + "." + character.thumbnail.extension}
            id={`${character.id}`}
          />
        );
      })}
    </div>
  );
}
