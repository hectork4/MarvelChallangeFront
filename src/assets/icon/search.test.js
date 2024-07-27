import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchIcon } from "./search";

describe("SearchIcon Component", () => {
  it("renders the SVG correctly", () => {
    render(<SearchIcon />);

    // Verifica que el SVG está en el documento
    const svgElement = screen.getByTestId("search-icon");
    expect(svgElement).toBeInTheDocument();

    // Verifica los atributos del SVG
    expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svgElement).toHaveAttribute("width", "20");
    expect(svgElement).toHaveAttribute("height", "20");
  });
});
