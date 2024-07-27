import { getComicsByCharacter } from "../";
import data from "../../data";

global.fetch = jest.fn();

describe("getComicsByCharacter", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error to prevent logging during tests
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations
  });

  it("should fetch comics data by character ID with results", async () => {
    const mockResponse = {
      data: {
        results: [{ id: "1", title: "Amazing Spider-Man" }],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getComicsByCharacter(characterId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${data.API_URL}/${characterId}/comics${data.API_PARAMS}&limit=10`
    );
    expect(results).toEqual(mockResponse.data.results);
  });

  it("should return an empty array if results are empty", async () => {
    const mockResponse = {
      data: {
        results: [],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getComicsByCharacter(characterId);

    expect(results).toEqual([]);
  });

  it("should return an empty array if results field is missing", async () => {
    const mockResponse = {
      data: {},
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getComicsByCharacter(characterId);

    expect(results).toEqual([]);
  });

  it("should return an empty array if data is missing", async () => {
    const mockResponse = {};

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getComicsByCharacter(characterId);

    expect(results).toEqual([]);
  });

  it("should return an empty array if data is not an object", async () => {
    const mockResponse = {
      data: "string_instead_of_object",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getComicsByCharacter(characterId);

    expect(results).toEqual([]);
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getComicsByCharacter("1")).rejects.toThrow("Network error");
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching character:",
      mockError
    );
  });

  it("should handle fetch with no character ID", async () => {
    const mockResponse = {
      data: {
        results: [{ id: "2", title: "Another Comic" }],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getComicsByCharacter();

    expect(global.fetch).toHaveBeenCalledWith(
      `${data.API_URL}/undefined/comics${data.API_PARAMS}&limit=10`
    );
    expect(results).toEqual(mockResponse.data.results);
  });
});
