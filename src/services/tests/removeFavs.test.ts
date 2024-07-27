import { removeFav } from "../";
import data from "../../data";

global.fetch = jest.fn();

describe("removeFav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should remove a favorite successfully", async () => {
    const mockResponse = { success: true };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const favourite = "item1";
    const token = "valid-token";
    const result = await removeFav({ favourite, token });

    expect(fetch).toHaveBeenCalledWith(
      `${data.USER_ENDPOINT}/favorites/remove`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favourite }),
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if response is not ok", async () => {
    const mockResponse = { error: "Some error occurred" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const favourite = "item1";
    const token = "valid-token";

    await expect(removeFav({ favourite, token })).rejects.toThrow(
      "Response is NOT ok"
    );
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Network error");

    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(
      removeFav({ favourite: "item1", token: "valid-token" })
    ).rejects.toThrow("Network error");
  });

  it("should handle JSON conversion errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
    });

    await expect(
      removeFav({ favourite: "item1", token: "valid-token" })
    ).rejects.toThrow("Invalid JSON");
  });
});
