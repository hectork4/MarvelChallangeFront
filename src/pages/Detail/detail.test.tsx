import { render, screen } from "@testing-library/react";
import Detail from "./";
import useSingleCharacter from "../../hooks/useSingleCharacter";
import { useRoute } from "wouter";
import { characterExample } from "../../hooks/tests/mockCharacter";

jest.mock("../../hooks/useSingleCharacter");
jest.mock("wouter", () => ({
  useRoute: jest.fn(),
}));
jest.mock("../../components/Spinner", () => () => <div>Spinner</div>);
jest.mock("../../components/Fav", () => () => <div>Fav</div>);

describe("Detail Component", () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue([true, { id: "1" }]);
  });

  it("should display a loading spinner when character data is loading", () => {
    (useSingleCharacter as jest.Mock).mockReturnValue({
      character: characterExample,
      formatedComics: [],
      isCharacterLoading: true,
      isComicsLoading: false,
    });

    render(<Detail />);
    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  it("should display character data once loaded", () => {
    (useSingleCharacter as jest.Mock).mockReturnValue({
      character: {
        id: "1",
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: {
          path: "path/to/spiderman",
          extension: "jpg",
        },
      },
      formatedComics: [],
      isCharacterLoading: false,
      isComicsLoading: false,
    });

    render(<Detail />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
    expect(
      screen.getByText("Friendly neighborhood Spider-Man.")
    ).toBeInTheDocument();
  });

  it("should display comics data once loaded", () => {
    (useSingleCharacter as jest.Mock).mockReturnValue({
      character: {
        id: "1",
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: {
          path: "path/to/spiderman",
          extension: "jpg",
        },
      },
      formatedComics: [
        {
          title: "Amazing Spider-Man #1",
          description: "First appearance of Spider-Man!",
          thumbnail: "path/to/image.jpg",
        },
      ],
      isCharacterLoading: false,
      isComicsLoading: false,
    });

    render(<Detail />);
    expect(screen.getByText("Amazing Spider-Man #1")).toBeInTheDocument();
    expect(screen.getByAltText("Amazing Spider-Man #1")).toBeInTheDocument();
  });

  it("should display a loading spinner when comics data is loading", () => {
    (useSingleCharacter as jest.Mock).mockReturnValue({
      character: {
        id: "1",
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: {
          path: "path/to/spiderman",
          extension: "jpg",
        },
      },
      formatedComics: [],
      isCharacterLoading: false,
      isComicsLoading: true,
    });

    render(<Detail />);
    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });
});
