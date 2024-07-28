import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import "./styles.css";
import useFormValidation from "../../hooks/useFormValidation";

interface AuthenticationProps {
  onLogin: () => void;
  isRegister?: boolean;
}

export default function Authentication({
  onLogin,
  isRegister = false,
}: AuthenticationProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { login, hasLoginError, register, isLogged } = useUser();
  const { validateUsername, validatePassword, validateConfirmPassword } =
    useFormValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = isRegister
      ? validateConfirmPassword(password, confirmPassword)
      : "";

    if (usernameError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }
    setErrors({ username: "", password: "", confirmPassword: "" });

    isRegister
      ? await register({ username, password, confirmPassword })
      : await login({ username, password });
  };

  useEffect(() => {
    if (isLogged) {
      onLogin();
    }
  }, [isLogged, onLogin]);

  return (
    <form onSubmit={handleSubmit} className="form" aria-live="polite">
      <div className="form-input-wrapper">
        <div className="form-group">
          <span className="input-user-icon" aria-hidden="true"></span>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
        </div>
        {errors.username && <pre className="error">{errors.username}</pre>}
      </div>
      <div className="form-input-wrapper">
        <div className="form-group">
          <span className="input-password-icon"></span>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>
        {errors.password && <pre className="error">{errors.password}</pre>}
      </div>
      {isRegister && (
        <div className="form-input-wrapper">
          <div className="form-group">
            <span className="input-password-icon"></span>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <pre className="error">{errors.confirmPassword}</pre>
          )}
        </div>
      )}

      <button
        type="submit"
        className="btn-login"
        aria-label={isRegister ? "Register" : "Login"}
      >
        {isRegister ? "Register" : "Login"}
      </button>
      {hasLoginError && (
        <pre className="error">
          There was an error connecting. Please try again.
        </pre>
      )}
    </form>
  );
}
