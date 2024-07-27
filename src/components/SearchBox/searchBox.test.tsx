import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBox from ".";

jest.mock("../../assets/icon/search", () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}));

describe("SearchBox", () => {
  it("renders the input with the correct placeholder and value", () => {
    const handleChange = jest.fn();
    const filterWord = "";

    render(<SearchBox handleChange={handleChange} filterWord={filterWord} />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(filterWord);
  });

  it("calls handleChange with the correct value when input changes", () => {
    const handleChange = jest.fn();
    const filterWord = "";

    render(<SearchBox handleChange={handleChange} filterWord={filterWord} />);

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");

    fireEvent.change(input, { target: { value: "Iron Man" } });
    expect(handleChange).toHaveBeenCalledWith("Iron Man");
  });
});
