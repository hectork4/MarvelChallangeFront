import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Character from "./index";

jest.mock("../Fav", () => () => <div data-testid="fav-mock"></div>);

jest.mock("wouter", () => ({
  Link: ({ to, children }: { to: any; children: any }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("Character Component", () => {
  const characterProps = {
    title: "Character Title",
    url: "http://example.com/image.jpg",
    id: "1",
  };

  test("renders character with title, image, and favorite button", () => {
    render(<Character {...characterProps} />);

    expect(screen.getByText(characterProps.title)).toBeInTheDocument();

    const imgElement = screen.getByAltText(characterProps.title);
    expect(imgElement).toHaveAttribute("src", characterProps.url);
    expect(imgElement).toHaveAttribute("loading", "lazy");

    expect(screen.getByTestId("fav-mock")).toBeInTheDocument();
  });

  test("link navigates to correct URL", () => {
    render(<Character {...characterProps} />);

    const linkElement = screen.getByRole("link", { name: /character/i });
    expect(linkElement).toHaveAttribute(
      "href",
      `/character/${characterProps.id}`
    );
  });
});
