import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./";
import { useCharacter } from "../../hooks/useCharacter";
import UserContext, { initialContext } from "../../context/UserContext";

jest.mock("../../hooks/useCharacter");
jest.mock("../../components/CharactersList", () => () => (
  <div>CharactersList</div>
));
jest.mock("../../components/Spinner", () => () => <div>Spinner</div>);
jest.mock(
  "../../components/SearchBox",
  () =>
    ({
      handleChange,
      filterWord,
    }: {
      handleChange: (word: string) => void;
      filterWord: string;
    }) =>
      (
        <input
          data-testid="search-box"
          value={filterWord}
          onChange={(e) => handleChange(e.target.value)}
        />
      )
);
jest.mock("../../components/SignUp", () => () => <div>LoginComponent</div>);

describe("Home Component", () => {
  const mockCharacters = [
    { id: "1", name: "Spider-Man" },
    { id: "2", name: "Iron Man" },
  ];

  beforeEach(() => {
    (useCharacter as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      filterWord: "",
      handleFilter: jest.fn(),
    });
  });

  it("should render the login component", () => {
    render(
      <UserContext.Provider
        value={{
          ...initialContext,
          favorites: [],
          favoriteScreen: false,
        }}
      >
        <Home />
      </UserContext.Provider>
    );
    expect(screen.getByText("LoginComponent")).toBeInTheDocument();
  });

  it("should render CharactersList when not loading", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, favoriteScreen: false, favorites: [] }}
      >
        <Home />
      </UserContext.Provider>
    );
    expect(screen.getByText("CharactersList")).toBeInTheDocument();
  });

  it("should show Spinner while loading and no characters are present", () => {
    (useCharacter as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      filterWord: "",
      handleFilter: jest.fn(),
    });

    render(
      <UserContext.Provider
        value={{ ...initialContext, favoriteScreen: false, favorites: [] }}
      >
        <Home />
      </UserContext.Provider>
    );

    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  it("should filter characters based on favorites", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, favoriteScreen: true, favorites: ["1"] }}
      >
        <Home />
      </UserContext.Provider>
    );

    expect(screen.getByText("CharactersList")).toBeInTheDocument();
  });

  it("should display the correct number of results", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, favoriteScreen: false, favorites: [] }}
      >
        <Home />
      </UserContext.Provider>
    );

    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();
  });

  it("should handle search input changes", () => {
    const handleFilter = jest.fn();
    (useCharacter as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      filterWord: "",
      handleFilter,
    });

    render(
      <UserContext.Provider
        value={{ ...initialContext, favoriteScreen: false, favorites: [] }}
      >
        <Home />
      </UserContext.Provider>
    );

    const searchBox = screen.getByTestId("search-box");
    fireEvent.change(searchBox, { target: { value: "Spider" } });
    expect(handleFilter).toHaveBeenCalledWith("Spider");
  });
});
