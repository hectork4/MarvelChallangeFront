import { renderHook } from "@testing-library/react";
import useUser from "../useUser";
import UserContext, { initialContext } from "../../context/UserContext";
import {
  loginService,
  register as registerService,
  addFav,
  removeFav,
} from "../../services";
import { act, ReactNode } from "react";

jest.mock("../../services");

describe("useUser Hook", () => {
  let mockContextValue: typeof initialContext;

  beforeEach(() => {
    mockContextValue = {
      ...initialContext,
      favorites: [],
      handleFavorites: jest.fn(),
      user: { token: "test-token", username: "testUser" },
      handleUser: jest.fn(),
    };

    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <UserContext.Provider value={mockContextValue}>
      {children}
    </UserContext.Provider>
  );

  it("should log in user and set jwt token", async () => {
    const fakeJwt = "fake-jwt-token";
    const fakeUsername = "testUser";
    const fakeFavorites = ["1", "2"];

    (loginService as jest.Mock).mockResolvedValue({
      jwt: fakeJwt,
      username: fakeUsername,
      favorites: fakeFavorites,
    });

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.login({
        username: fakeUsername,
        password: "password",
      });
    });

    expect(mockContextValue.handleUser).toHaveBeenCalledWith(
      fakeUsername,
      fakeJwt
    );
    expect(mockContextValue.handleFavorites).toHaveBeenCalledWith(
      fakeFavorites
    );
    expect(result.current.isLoginLoading).toBe(false);
    expect(result.current.hasLoginError).toBe(false);
  });

  it("should handle login error", async () => {
    (loginService as jest.Mock).mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.login({
        username: "testUser",
        password: "wrong-password",
      });
    });

    expect(result.current.isLoginLoading).toBe(false);
    expect(result.current.hasLoginError).toBe(true);
  });

  it("should register user successfully", async () => {
    const fakeJwt = "fake-jwt-token";
    const fakeUsername = "testUser";

    (registerService as jest.Mock).mockResolvedValue({
      jwt: fakeJwt,
      username: fakeUsername,
    });

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.register({
        username: fakeUsername,
        password: "password",
        confirmPassword: "password",
      });
    });

    expect(mockContextValue.handleUser).toHaveBeenCalledWith(
      fakeUsername,
      fakeJwt
    );
    expect(mockContextValue.handleFavorites).toHaveBeenCalledWith([]);
    expect(result.current.isLoginLoading).toBe(false);
    expect(result.current.hasLoginError).toBe(false);
  });

  it("should handle register error if passwords do not match", async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.register({
        username: "testUser",
        password: "password",
        confirmPassword: "wrong-password",
      });
    });

    expect(result.current.isLoginLoading).toBe(false);
    expect(result.current.hasLoginError).toBe(true);
  });

  it("should logout user and clear session storage", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(mockContextValue.handleUser).toHaveBeenCalledWith();
    expect(mockContextValue.handleFavorites).toHaveBeenCalledWith([]);
    expect(window.sessionStorage.getItem("jwt")).toBe("");
  });

  it("should add a favorite character", async () => {
    const newFavoriteId = "2";
    (addFav as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      result.current.addFavorite({ id: newFavoriteId });
    });

    expect(mockContextValue.handleFavorites).toHaveBeenCalledWith([
      ...mockContextValue.favorites,
      newFavoriteId,
    ]);
    expect(addFav).toHaveBeenCalledWith({
      favorite: newFavoriteId,
      token: "test-token",
    });
  });

  it("should remove a favorite character", async () => {
    const favoriteIdToRemove = "1";
    mockContextValue.favorites = [favoriteIdToRemove, "2"];
    (removeFav as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      result.current.removeFavorite({ id: favoriteIdToRemove });
    });

    expect(mockContextValue.handleFavorites).toHaveBeenCalledWith(
      mockContextValue.favorites.filter((fav) => fav !== favoriteIdToRemove)
    );
    expect(removeFav).toHaveBeenCalledWith({
      favourite: favoriteIdToRemove,
      token: "test-token",
    });
  });
});
