import React, { useContext } from "react";

import CharactersList from "../../components/CharactersList";

import Spinner from "../../components/Spinner";
import { useCharacter } from "../../hooks/useCharacter";
import SearchBox from "../../components/SearchBox";
import UserContext from "../../context/UserContext";
import LoginComponent from "../../components/SignUp";

export default function Home() {
  const { characters, loading, filterWord, handleFilter } = useCharacter();
  const { favoriteScreen, favorites } = useContext(UserContext);

  const filteredCharacters = favoriteScreen
    ? characters.filter((character) => {
        return favorites.includes(`${character.id}`);
      })
    : characters;

  return (
    <>
      <LoginComponent />
      <div style={{ padding: "0 50px" }}>
        <div className="search-wrapper">
          <SearchBox handleChange={handleFilter} filterWord={filterWord} />
          <span>{filteredCharacters.length} RESULTS</span>
        </div>
        <div className="App-main">
          <div className="App-results">
            {loading && characters.length === 0 ? (
              <Spinner />
            ) : (
              <>
                <CharactersList characters={filteredCharacters} />
                {loading && <Spinner />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
