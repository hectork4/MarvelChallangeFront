export const getFavoritesFromLocalStorage = (): string[] => {
  const favorites = window.localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export {};
