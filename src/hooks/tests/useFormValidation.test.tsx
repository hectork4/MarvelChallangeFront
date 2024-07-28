import { renderHook } from "@testing-library/react";
import useFormValidation from "../useFormValidation";

describe("useFormValidation", () => {
  const { result } = renderHook(() => useFormValidation());

  describe("validateUsername", () => {
    it("should return an error if username is less than 4 characters", () => {
      const error = result.current.validateUsername("abc");
      expect(error).toBe("Username must be at least 4 characters.");
    });

    it("should return an error if username contains invalid characters", () => {
      const error = result.current.validateUsername("abc!");
      expect(error).toBe("Username must be only letters and numbers.");
    });

    it("should return an empty string if username is valid", () => {
      const error = result.current.validateUsername("abcd1234");
      expect(error).toBe("");
    });
  });

  describe("validatePassword", () => {
    it("should return an error if password is less than 6 characters", () => {
      const error = result.current.validatePassword("12345");
      expect(error).toBe("Password must be at least 6 characters long.");
    });

    it("should return an empty string if password is valid", () => {
      const error = result.current.validatePassword("123456");
      expect(error).toBe("");
    });
  });

  describe("validateConfirmPassword", () => {
    it("should return an error if passwords do not match", () => {
      const error = result.current.validateConfirmPassword("123456", "654321");
      expect(error).toBe("Password confirmation is different.");
    });

    it("should return an empty string if passwords match", () => {
      const error = result.current.validateConfirmPassword("123456", "123456");
      expect(error).toBe("");
    });
  });
});
