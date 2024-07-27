import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Spinner from ".";

describe("Spinner Component", () => {
  it("renders spinner with correct structure", () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByTestId("spinner");
    expect(spinnerContainer).toBeInTheDocument();

    expect(spinnerContainer).toHaveClass("lds-ring");
  });
});
