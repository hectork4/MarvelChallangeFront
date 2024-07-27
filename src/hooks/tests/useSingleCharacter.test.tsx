import { renderHook } from "@testing-library/react";
import useSingleCharacter from "./../useSingleCharacter";
import { useCharacter } from "../useCharacter";
import useCharactersQuery from "../useCharactersQuery";
import useCharactersComicQuery from "../useCharactersComicQuery";

jest.mock("../useCharacter");
jest.mock("../useCharactersQuery");
jest.mock("../useCharactersComicQuery");

describe("useSingleCharacter", () => {
  const id = "1017100";

  const mockCharacter = {
    id: "1017100",
    name: "A-Bomb (HAS)",
  };
  const mockComic = {
    title: "Hulk (2008) #53",
    description: "Some description",
    thumbnail: {
      path: "http://image.path",
      extension: "jpg",
    },
  };

  beforeEach(() => {
    (useCharacter as jest.Mock).mockImplementation((id: string) => {
      if (id === "1017100") {
        return {
          characters: [mockCharacter],
          isLoading: false,
          isError: false,
        };
      }

      return {
        characters: null,
        isLoading: true,
        isError: false,
      };
    });
    (useCharactersQuery as jest.Mock).mockReturnValue({
      characters: [mockCharacter],
      isLoading: false,
      isError: false,
    });
    (useCharactersComicQuery as jest.Mock).mockReturnValue({
      characters: [mockComic],
      isLoading: false,
      isError: false,
    });
  });

  it("should return character from cache if available", () => {
    const { result } = renderHook(() => useSingleCharacter({ id }));

    expect(result.current.character).toEqual(mockCharacter);
    expect(result.current.isComicsLoading).toBe(false);
    expect(result.current.formatedComics).toEqual([
      {
        title: mockComic.title,
        description: mockComic.description,
        thumbnail: `${mockComic.thumbnail.path}.${mockComic.thumbnail.extension}`,
      },
    ]);
  });

  it("should fetch character", () => {
    (useCharacter as jest.Mock).mockReturnValue({
      characters: [mockCharacter],
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useSingleCharacter({ id }));

    expect(result.current.character).toEqual(mockCharacter);
  });

  it("should handle loading state for comics", () => {
    (useCharactersComicQuery as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: true,
      isError: false,
    });

    const { result } = renderHook(() => useSingleCharacter({ id }));

    expect(result.current.isComicsLoading).toBe(true);
  });

  it("should format comics correctly", () => {
    const { result } = renderHook(() => useSingleCharacter({ id }));

    expect(result.current.formatedComics).toEqual([
      {
        title: mockComic.title,
        description: mockComic.description,
        thumbnail: `${mockComic.thumbnail.path}.${mockComic.thumbnail.extension}`,
      },
    ]);
  });
});
