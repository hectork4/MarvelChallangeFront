import { addFav } from "../"; // Ajusta la ruta según tu estructura de proyecto
import data from "../../data";

global.fetch = jest.fn();

describe("addFav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error to prevent logging during tests
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations
  });

  it("should add a favorite successfully", async () => {
    const mockResponse = { success: true };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const favorite = "item1";
    const token = "valid-token";
    const result = await addFav({ favorite, token });

    expect(fetch).toHaveBeenCalledWith(`${data.USER_ENDPOINT}/favorites/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite }),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if response is not ok", async () => {
    const mockResponse = { error: "Some error occurred" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const favorite = "item1";
    const token = "valid-token";

    await expect(addFav({ favorite, token })).rejects.toThrow("Network Error");
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Network error");

    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(
      addFav({ favorite: "item1", token: "valid-token" })
    ).rejects.toThrow("Network error");
  });

  it("should handle JSON conversion errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
    });

    await expect(
      addFav({ favorite: "item1", token: "valid-token" })
    ).rejects.toThrow("Invalid JSON");
  });
});
