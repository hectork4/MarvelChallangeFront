export const getFavorites = jest.fn();
export const loginService = jest.fn(({ username, password }) =>
  Promise.resolve({
    jwt: "fake-jwt",
    username,
    favorites: ["favorite1", "favorite2"],
  })
);
