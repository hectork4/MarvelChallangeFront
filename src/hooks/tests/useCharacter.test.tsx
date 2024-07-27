import { useCharacter } from "../useCharacter";
import useCharactersQuery from "../useCharactersQuery";
import { Character } from "../../interfaces/Character";
import { characterExample } from "./mockCharacter";
import { renderHook } from "@testing-library/react";
import { act } from "react";

jest.mock("../useCharactersQuery");

describe("useCharacter", () => {
  const mockCharacters: Character[] = [
    { ...characterExample, id: 1 },
    { ...characterExample, id: 2, name: "Iron Man" },
    {
      ...characterExample,
      id: 3,
      name: "Captain America",
    },
  ];

  beforeEach(() => {
    (useCharactersQuery as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      isLoading: false,
    });
  });

  it("should return all characters initially", () => {
    const { result } = renderHook(() => useCharacter());

    expect(result.current.characters).toEqual(mockCharacters);
  });

  it("should filter characters based on filterWord", () => {
    const { result } = renderHook(() => useCharacter());

    act(() => {
      result.current.handleFilter("iron");
    });

    expect(result.current.characters).toEqual([
      { ...characterExample, id: 2, name: "Iron Man" },
    ]);
  });

  it("should return the filtered list when filterWord is set", () => {
    const { result } = renderHook(() => useCharacter());

    act(() => {
      result.current.handleFilter("man");
    });

    expect(result.current.characters).toEqual([
      { ...characterExample, id: 2, name: "Iron Man" },
    ]);
  });

  it("should return loading state when isLoading is true", () => {
    (useCharactersQuery as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: true,
    });

    const { result } = renderHook(() => useCharacter());

    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
  });
});
