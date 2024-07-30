import { useContext, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserContext, { UserContextProvider } from "./UserContext";
import { getFavorites } from "../services";

jest.mock("../services", () => ({
  getFavorites: jest.fn(),
}));

describe("UserContextProvider", () => {
  beforeEach(() => {
    (getFavorites as jest.Mock).mockReset();
  });

  it("test handleUser function", async () => {
    const mockFavorites = ["item1", "item2"];
    const mockUsername = "testuser";

    (getFavorites as jest.Mock).mockResolvedValueOnce({
      favorites: mockFavorites,
      username: mockUsername,
    });

    const TestComponent = () => {
      const { user, handleUser } = useContext(UserContext);

      useEffect(() => {
        handleUser("testUser", "testToken");
      }, []);

      return (
        <div>
          <span aria-label="username">{user.username}</span>
          <span aria-label="token">{user.token}</span>
        </div>
      );
    };

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    const usernameSpan = screen.getByLabelText("username");
    const tokenSpan = screen.getByLabelText("token");
    expect(usernameSpan.innerHTML).toBe("testUser");
    expect(tokenSpan.innerHTML).toBe("testToken");
  });

  it("initial state without token", () => {
    const TestComponent = () => {
      const { favorites, user } = useContext(UserContext);
      return (
        <div>
          <span aria-label="favorites">{favorites.join(", ")}</span>
          <span aria-label="username">{user.username}</span>
          <span aria-label="token">{user.token}</span>
        </div>
      );
    };

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    expect(screen.getByLabelText("favorites").textContent).toBe("");
    expect(screen.getByLabelText("username").textContent).toBe("");
    expect(screen.getByLabelText("token").textContent).toBe("");
  });

  it("test handles functions", async () => {
    const mockFavorites = ["item1", "item2"];
    const mockUsername = "testuser";

    (getFavorites as jest.Mock).mockResolvedValueOnce({
      favorites: mockFavorites,
      username: mockUsername,
    });

    const TestComponent = () => {
      const {
        handleFavorites,
        favorites,
        handleUser,
        user,
        handleLimit,
        limit,
      } = useContext(UserContext);

      useEffect(() => {
        handleUser("testuser", "token");
        handleLimit(10);
      }, []);

      useEffect(() => {
        handleFavorites(["1", "2"]);
      }, [user.token]);

      return (
        <div>
          <span aria-label="favorites">{favorites.join(", ")}</span>
          <span aria-label="user">{user.username}</span>
          <span aria-label="limit">{limit}</span>
        </div>
      );
    };

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    const favoritesSpan = screen.getByLabelText("favorites");
    expect(favoritesSpan.innerHTML).toBe("1, 2");
    const userSpan = screen.getByLabelText("user");
    expect(userSpan.innerHTML).toBe("testuser");
    const limitSpan = screen.getByLabelText("limit");
    expect(limitSpan.innerHTML).toBe("10");
  });

  it("toggleFavoriteScreen functions", async () => {
    const TestComponent = () => {
      const { toggleFavoriteScreen, favoriteScreen } = useContext(UserContext);

      (getFavorites as jest.Mock).mockResolvedValueOnce({
        favorites: [],
        username: "",
      });

      useEffect(() => {
        toggleFavoriteScreen(true);
      }, [toggleFavoriteScreen]);

      return (
        <div>
          <span aria-label="favoriteScreen">
            {favoriteScreen ? "true" : "false"}
          </span>
        </div>
      );
    };

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    expect(screen.getByLabelText("favoriteScreen").textContent).toBe("true");
  });

  it("handles error in getFavorites (non-Unauthorized)", async () => {
    (getFavorites as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    const TestComponent = () => {
      const { favorites } = useContext(UserContext);
      return <div aria-label="favorites">{favorites.join(", ")}</div>;
    };

    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    expect(screen.getByLabelText("favorites").textContent).toBe("1, 2");
  });
});
