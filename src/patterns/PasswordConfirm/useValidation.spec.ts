import { renderHook, act } from "@testing-library/react";
import useValidation from "./useValidation";

describe("useValidation", () => {
  it("should validate matching passwords with all criteria met", () => {
    const { result } = renderHook(() =>
      useValidation("Password1!", "Password1!")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toHaveLength(0);
    expect(result.current.valid).toBe(true);
  });

  it("should invalidate non-matching passwords", () => {
    const { result } = renderHook(() =>
      useValidation("Password1!", "Password2!")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(false);
    expect(result.current.errorMessages).toHaveLength(0);
    expect(result.current.valid).toBe(false);
  });

  it("should invalidate passwords that are too short", () => {
    const { result } = renderHook(() => useValidation("Pass1", "Pass1"));

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toContain(
      "Password must be at least 6 characters long."
    );
    expect(result.current.valid).toBe(false);
  });

  it("should invalidate passwords missing an uppercase letter", () => {
    const { result } = renderHook(() =>
      useValidation("password1!", "password1!")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toContain(
      "Password must contain at least one uppercase letter."
    );
    expect(result.current.valid).toBe(false);
  });

  it("should invalidate passwords missing a lowercase letter", () => {
    const { result } = renderHook(() =>
      useValidation("PASSWORD1!", "PASSWORD1!")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toContain(
      "Password must contain at least one lowercase letter."
    );
    expect(result.current.valid).toBe(false);
  });

  it("should invalidate passwords missing a numeric character", () => {
    const { result } = renderHook(() =>
      useValidation("Password!", "Password!")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toContain(
      "Password must contain at least one number."
    );
    expect(result.current.valid).toBe(false);
  });

  it("should invalidate passwords missing a special character", () => {
    const { result } = renderHook(() =>
      useValidation("Password1", "Password1")
    );

    act(() => {
      result.current.validatePassword();
    });

    expect(result.current.match).toBe(true);
    expect(result.current.errorMessages).toContain(
      "Password must contain at least one special character."
    );
    expect(result.current.valid).toBe(false);
  });
});
