import "./styles.css";

import { SearchIcon } from "../../assets/icon/search";

const SearchBox = ({
  handleChange,
  filterWord,
}: {
  handleChange: (word: string) => void;
  filterWord: string;
}) => {
  return (
    <form role="search" aria-labelledby="search-label">
      <div className="search">
        <SearchIcon />
        <input
          className="search-input"
          type="search"
          placeholder="SEARCH A CHARACTER"
          value={filterWord}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Search for a character"
        />
      </div>
    </form>
  );
};

export default SearchBox;
