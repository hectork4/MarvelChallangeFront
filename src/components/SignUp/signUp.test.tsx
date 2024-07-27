import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginComponent from ".";
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
  favorites: [] as string[],
};

jest.mock("../../hooks/useUser", () => ({
  __esModule: true,
  default: () => ({
    logout: jest.fn(),
  }),
}));

jest.mock("../Modal", () => ({
  __esModule: true,
  default: ({
    children,
    onClose,
    title,
  }: {
    children: React.ReactNode;
    onClose: () => void;
    title?: string;
  }) => (
    <div data-testid="modal" role="dialog">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

jest.mock("../Authentication", () => ({
  __esModule: true,
  default: ({
    onLogin,
    isRegister,
  }: {
    onLogin: () => void;
    isRegister?: boolean;
  }) => (
    <div>
      <p>{isRegister ? "Register" : "Login"}</p>
      <button onClick={onLogin}>Submit</button>
    </div>
  ),
}));

describe("SignUp component", () => {
  const mockLogout = jest.fn();
  it("renders login/register buttons when user is not authenticated", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, user: { username: "", token: "" } }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("opens modal with Login when login button is clicked", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, user: { username: "", token: "" } }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Login"));
    expect(screen.getByTestId("modal")).toHaveTextContent("Login");
  });

  it("opens modal with Register when register button is clicked", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, user: { username: "", token: "" } }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Register"));
    expect(screen.getByTestId("modal")).toHaveTextContent("Register");
  });

  it("closes the modal when the close button is clicked", () => {
    render(
      <UserContext.Provider
        value={{ ...initialContext, user: { username: "", token: "" } }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Login"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("shows username and logout button when user is authenticated", () => {
    render(
      <UserContext.Provider
        value={{
          ...initialContext,
          user: { username: "testuser", token: "testtoken" },
        }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    jest.spyOn(userModule, "default").mockReturnValue({
      ...initialUseUser,
      logout: mockLogout,
    });

    render(
      <UserContext.Provider
        value={{
          ...initialContext,
          user: { username: "testuser", token: "testtoken" },
        }}
      >
        <LoginComponent />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalled();
  });
});
