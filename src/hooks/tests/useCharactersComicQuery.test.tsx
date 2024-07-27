import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCharactersComicQuery from "../useCharactersComicQuery";
import { getComicsByCharacter } from "../../services";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";

jest.mock("../../services/getCharacterComic");

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("useCharactersComicQuery", () => {
  const id = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", async () => {
    (getComicsByCharacter as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useCharactersComicQuery({ id }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should return data when fetching is successful", async () => {
    const comics = [{ id: "1", title: "Comic 1" }];
    (getComicsByCharacter as jest.Mock).mockResolvedValueOnce(comics);

    const { result } = renderHook(() => useCharactersComicQuery({ id }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.characters).toEqual(comics);
    expect(result.current.isError).toBe(false);
  });

  it("should return error when fetching fails", async () => {
    (getComicsByCharacter as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const { result } = renderHook(() => useCharactersComicQuery({ id }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
  });
});
