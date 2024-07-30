import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Authentication from "./index";
import useUser from "../../hooks/useUser";

jest.mock("../../hooks/useUser");

describe("Authentication Component", () => {
  const mockLogin = jest.fn();
  const mockRegister = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
      hasLoginError: false,
      isLogged: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(<Authentication onLogin={mockOnLogin} />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls login on form submit", async () => {
    render(<Authentication onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "password",
      });
    });
  });

  it("renders registration form and calls register on form submit", async () => {
    render(<Authentication onLogin={mockOnLogin} isRegister={true} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: "newuser",
        password: "newpassword",
        confirmPassword: "newpassword",
      });
    });
  });

  it("shows error message on login failure", async () => {
    (useUser as jest.Mock).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
      hasLoginError: true,
      isLogged: false,
    });

    render(<Authentication onLogin={mockOnLogin} />);

    expect(
      screen.getByText("There was an error connecting. Please try again.")
    ).toBeInTheDocument();
  });

  it("calls onLogin when user is logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
      hasLoginError: false,
      isLogged: true,
    });

    render(<Authentication onLogin={mockOnLogin} />);

    expect(mockOnLogin).toHaveBeenCalled();
  });

  it("inputs and button are accessible", () => {
    render(<Authentication onLogin={mockOnLogin} />);

    const usernameLabel = screen.getByLabelText("Username");
    const passwordLabel = screen.getByLabelText("Password");

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute("type", "submit");
  });

  it("registration form inputs are accessible", () => {
    render(<Authentication onLogin={mockOnLogin} isRegister={true} />);

    const confirmPasswordLabel = screen.getByLabelText("Confirm Password");
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it("shows validation errors on invalid input", async () => {
    render(<Authentication onLogin={mockOnLogin} isRegister={true} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "abc" }, // Invalid username, too short
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "12345" }, // Invalid password, too short
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123" }, // Doesn't match the password
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(
      await screen.findByText("Username must be at least 4 characters.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 6 characters long.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password confirmation is different.")
    ).toBeInTheDocument();
  });
});
