import fetchMock from "jest-fetch-mock";
import { loginService } from "../";

fetchMock.enableMocks();

describe("loginService", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should login successfully and return token and user details", async () => {
    const fakeToken = "fake-jwt-token";
    const fakeUsername = "pepe";
    const fakeFavorites = ["1009144", "1010699", "1009146", "1017100"];
    const mockResponse = {
      token: fakeToken,
      user: {
        username: fakeUsername,
        favorites: fakeFavorites,
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await loginService({
      username: "pepe",
      password: "123456",
    });

    expect(result.jwt).toBeDefined();
    expect(result.username).toEqual(fakeUsername);
    expect(result.favorites.filter((fav) => fav === "2")).toBeTruthy();
  });

  it("should handle unsuccessful login response", async () => {
    fetchMock.mockResponseOnce("", { status: 400 });

    await expect(
      loginService({
        username: "testUser",
        password: "wrong-password",
      })
    ).rejects.toThrow("Response is NOT ok");
  });

  it("should handle fetch errors", async () => {
    fetchMock.mockRejectOnce(new Error("Error: Response is NOT ok"));

    await expect(
      loginService({
        username: "testUser",
        password: "password",
      })
    ).rejects.toThrow("Error: Response is NOT ok");
  });

  it("should throw an error when there is no network connection", async () => {
    fetchMock.mockRejectOnce(new Error("Network error: Failed to connect"));

    await expect(
      loginService({
        username: "testUser",
        password: "password",
      })
    ).rejects.toThrow("Network error: Failed to connect");
  });
});
