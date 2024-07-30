import { getFavoritesFromLocalStorage } from "./getFavsFromLocal";

describe("getFavoritesFromLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return an empty array if there are no favorites in localStorage", () => {
    const favorites = getFavoritesFromLocalStorage();
    expect(favorites).toEqual([]);
  });

  it("should return an array with the stored favorites", () => {
    const mockFavorites = ["item1", "item2", "item3"];
    window.localStorage.setItem("favorites", JSON.stringify(mockFavorites));

    const favorites = getFavoritesFromLocalStorage();
    expect(favorites).toEqual(mockFavorites);
  });

  it("should handle invalid JSON in localStorage", () => {
    window.localStorage.setItem("favorites", "invalid JSON");

    expect(() => getFavoritesFromLocalStorage()).toThrow(SyntaxError);
  });
});
