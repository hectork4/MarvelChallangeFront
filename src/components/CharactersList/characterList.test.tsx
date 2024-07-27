import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CharactersList from "./index";

jest.mock("../Character", () => ({
  __esModule: true,
  default: ({ title, url, id }: { title: string; url: string; id: string }) => (
    <div data-testid={`character-${id}`}>
      <h4>{title}</h4>
      <img src={url} alt={title} />
    </div>
  ),
}));

describe("CharactersList Component", () => {
  it("renders a list of characters", () => {
    const characters = [
      {
        id: "1",
        name: "Character One",
        thumbnail: {
          path: "http://example.com/char1",
          extension: "jpg",
        },
      },
      {
        id: "2",
        name: "Character Two",
        thumbnail: {
          path: "http://example.com/char2",
          extension: "png",
        },
      },
    ];

    render(<CharactersList characters={characters} />);

    characters.forEach((character) => {
      const { id, name, thumbnail } = character;
      const characterElement = screen.getByTestId(`character-${id}`);
      expect(characterElement).toBeInTheDocument();

      expect(screen.getByText(name)).toBeInTheDocument();
      expect(
        within(screen.getByTestId(`character-${id}`)).getByRole("img")
      ).toHaveAttribute(
        "src",
        `http://example.com/char${id}.${thumbnail.extension}`
      );
    });
  });

  it("renders nothing if there are no characters", () => {
    render(<CharactersList characters={[]} />);

    expect(screen.queryByTestId(/character-/)).toBeNull();
  });
});
