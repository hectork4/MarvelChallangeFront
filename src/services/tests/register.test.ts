import { register } from "../";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("register function", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should successfully register and return JWT and username", async () => {
    const mockResponse = {
      token: "mockToken123",
      username: "mockUser",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await register({
      username: "testUser",
      password: "testPass",
    });

    expect(result).toEqual({ jwt: "mockToken123", username: "mockUser" });
  });

  it("should handle errors correctly", async () => {
    fetchMock.mockResponseOnce("Error", { status: 400 });

    await expect(
      register({ username: "testUser", password: "testPass" })
    ).rejects.toThrow("Error: Response is NOT ok");
  });
});
