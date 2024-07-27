import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCharactersQuery from "../useCharactersQuery";
import { getCharacter } from "../../services";
import { ReactNode } from "react";

jest.mock("../../services");

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

describe("useCharactersQuery", () => {
  const id = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", async () => {
    (getCharacter as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useCharactersQuery({ id }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should return data when fetching is successful", async () => {
    const characters = [{ id: "1", name: "Character 1" }];
    (getCharacter as jest.Mock).mockResolvedValueOnce(characters);

    const { result } = renderHook(() => useCharactersQuery({ id }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.characters).toEqual(characters);
    expect(result.current.isError).toBe(false);
  });

  it("should return error when fetching fails", async () => {
    (getCharacter as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const { result } = renderHook(() => useCharactersQuery({ id }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
  });
});
