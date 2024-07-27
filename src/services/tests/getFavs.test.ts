import { getFavorites } from "../";
import data from "../../data";

global.fetch = jest.fn();

describe("getFavorites", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch favorites successfully with valid data", async () => {
    const mockResponse = { favorites: ["item1", "item2"] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const jwt = "valid-jwt-token";
    const result = await getFavorites({ jwt });

    expect(fetch).toHaveBeenCalledWith(`${data.USER_ENDPOINT}/favorites`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle empty favorites response", async () => {
    const mockResponse = { favorites: [] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const jwt = "valid-jwt-token";
    const result = await getFavorites({ jwt });

    expect(result).toEqual(mockResponse);
  });

  it("should handle response without expected data structure", async () => {
    const mockResponse = { someOtherKey: "someValue" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const jwt = "valid-jwt-token";
    const result = await getFavorites({ jwt });

    expect(result).toEqual(mockResponse);
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Network error");

    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getFavorites({ jwt: "valid-jwt-token" })).rejects.toThrow(
      "Network error"
    );
  });

  it("should handle JSON conversion errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
    });

    await expect(getFavorites({ jwt: "valid-jwt-token" })).rejects.toThrow(
      "Invalid JSON"
    );
  });
});
