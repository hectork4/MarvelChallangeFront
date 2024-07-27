import { getCharacter } from "../";
import data from "../../data";

global.fetch = jest.fn();

describe("getCharacter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error to prevent logging during tests
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations
  });

  it("should fetch character data by ID with results", async () => {
    const mockResponse = {
      data: {
        results: [{ id: "1", name: "Spider-Man" }],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const characterId = "1";
    const results = await getCharacter(characterId);

    expect(fetch).toHaveBeenCalledWith(
      `${data.API_URL}/${characterId}${data.API_PARAMS}&limit=50`
    );
    expect(results).toEqual(mockResponse.data.results);
  });

  it("should fetch character data without ID with results", async () => {
    const mockResponse = {
      data: {
        results: [{ id: "1", name: "Spider-Man" }],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getCharacter();

    expect(fetch).toHaveBeenCalledWith(
      `${data.API_URL}${data.API_PARAMS}&limit=50`
    );
    expect(results).toEqual(mockResponse.data.results);
  });

  it("should set the correct limit parameter", async () => {
    const mockResponse = {
      data: {
        results: [{ id: "2", name: "Iron Man" }],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    await getCharacter(undefined, 100);

    expect(fetch).toHaveBeenCalledWith(
      `${data.API_URL}${data.API_PARAMS}&limit=100`
    );
  });

  it("should return an empty array if results are empty", async () => {
    const mockResponse = {
      data: {
        results: [],
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getCharacter("1");

    expect(results).toEqual([]);
  });

  it("should return an empty array if results field is missing", async () => {
    const mockResponse = {
      data: {},
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getCharacter("1");

    expect(results).toEqual([]);
  });

  it("should return an empty array if data is missing", async () => {
    const mockResponse = {};

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getCharacter("1");

    expect(results).toEqual([]);
  });

  it("should return an empty array if data is not an object", async () => {
    const mockResponse = {
      data: "string_instead_of_object",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const results = await getCharacter("1");

    expect(results).toEqual([]);
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getCharacter()).rejects.toThrow("Network error");
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching character:",
      mockError
    );
  });
});
