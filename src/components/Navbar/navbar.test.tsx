import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserContext, { initialContext } from "../../context/UserContext";
import { useLocation, HookReturnValue, BaseLocationHook } from "wouter";
import Navbar from ".";

jest.mock("wouter", () => ({
  useLocation: jest.fn(),
}));

const mockToggleFavoriteScreen = jest.fn();

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (
      useLocation as jest.Mock<HookReturnValue<BaseLocationHook>>
    ).mockReturnValue(["", jest.fn()]);
  });

  it("navigates to home and toggles favorite screen on logo click", () => {
    const navigate = jest.fn();
    (
      useLocation as jest.Mock<HookReturnValue<BaseLocationHook>>
    ).mockReturnValue(["", navigate]);

    render(
      <UserContext.Provider
        value={{
          ...initialContext,
          favorites: [],
          toggleFavoriteScreen: mockToggleFavoriteScreen,
        }}
      >
        <Navbar />
      </UserContext.Provider>
    );

    const logoButton = screen.getByRole("button", { name: /marvel-logo/i });
    fireEvent.click(logoButton);

    expect(mockToggleFavoriteScreen).toHaveBeenCalledWith(false);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("toggles favorite screen on favorite item click", () => {
    const navigate = jest.fn();
    (
      useLocation as jest.Mock<HookReturnValue<BaseLocationHook>>
    ).mockReturnValue(["", navigate]);

    render(
      <UserContext.Provider
        value={{
          ...initialContext,
          favorites: ["1", "2", "3"],
          toggleFavoriteScreen: mockToggleFavoriteScreen,
        }}
      >
        <Navbar />
      </UserContext.Provider>
    );

    const favItem = screen.getByText(/❤️ 3/i);
    fireEvent.click(favItem);

    expect(mockToggleFavoriteScreen).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
