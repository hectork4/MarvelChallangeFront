import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Fav from "./index";
import UserContext, { initialContext } from "../../context/UserContext";
import * as userModule from "../../hooks/useUser";

const initialUseUser = {
  isLogged: false,
  isLoginLoading: false,
  hasLoginError: false,
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  favorites: [],
};

jest.mock("../../hooks/useUser", () => ({
  __esModule: true,
  default: () => ({
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  }),
}));

describe("Fav Component", () => {
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockContextValue = {
    ...initialContext,
    favorites: [],
    user: { token: "mockToken", username: "mockUser" },
  };

  it("renders add to favorites button when the character is not in favorites", () => {
    render(
      <UserContext.Provider value={mockContextValue}>
        <Fav id="1" />
      </UserContext.Provider>
    );

    const span = screen.getByRole("img");

    expect(span).toHaveTextContent("🤍");
    expect(span).toHaveAccessibleName("Add Character to favorites");
  });

  it("renders remove from favorites button when the character is in favorites", () => {
    const mockContextValue = {
      ...initialContext,
      favorites: ["1"],
      user: { token: "mockToken", username: "mockUser" },
    };

    render(
      <UserContext.Provider value={mockContextValue}>
        <Fav id="1" />
      </UserContext.Provider>
    );

    const span = screen.getByRole("img");

    expect(span).toHaveTextContent("❤️");
    expect(span).toHaveAccessibleName("Remove Character from favorites");
  });

  it("calls addFavorite when the character is not in favorites and the button is clicked", () => {
    const mockContextValue = {
      ...initialContext,
      favorites: [],
      user: { token: "mockToken", username: "mockUser" },
    };
    jest.spyOn(userModule, "default").mockReturnValue({
      ...initialUseUser,
      addFavorite: mockAddFavorite,
    });

    render(
      <UserContext.Provider value={mockContextValue}>
        <Fav id="1" />
      </UserContext.Provider>
    );

    const span = screen.getByRole("img");

    expect(span).toHaveTextContent("🤍");

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockAddFavorite).toHaveBeenCalledTimes(1);
    expect(mockAddFavorite).toHaveBeenCalledWith({ id: "1" });
  });

  it("calls removeFavorite when the character is in favorites and the button is clicked", () => {
    const mockContextValue = {
      ...initialContext,
      favorites: ["1"],
      user: { token: "mockToken", username: "mockUser" },
    };

    jest.spyOn(userModule, "default").mockReturnValue({
      ...initialUseUser,
      removeFavorite: mockRemoveFavorite,
    });

    render(
      <UserContext.Provider value={mockContextValue}>
        <Fav id="1" />
      </UserContext.Provider>
    );

    const span = screen.getByRole("img");
    expect(span).toHaveTextContent("❤️");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith({ id: "1" });
    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  });
});
