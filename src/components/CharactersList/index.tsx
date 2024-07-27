import React from "react";
import Character from "../Character";
import "./styles.css";

export default function CharactersList({
  characters,
}: {
  characters: Array<any>;
}) {
  return (
    <div className="characters-list">
      {characters?.map((character) => {
        return (
          <Character
            key={character.id}
            title={character.name}
            url={character.thumbnail.path + "." + character.thumbnail.extension}
            id={character.id}
          />
        );
      })}
    </div>
  );
}
