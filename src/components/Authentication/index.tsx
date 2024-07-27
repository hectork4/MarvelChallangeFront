import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import "./styles.css";

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
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { login, hasLoginError, register, isLogged } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      {isRegister && (
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
      )}

      <button
        type="submit"
        className="btn-login"
        aria-label={isRegister ? "Register" : "Login"}
      >
        {isRegister ? "Register" : "Login"}
      </button>

      {hasLoginError && (
        <span className="error" role="alert">
          Hubo un error en el proceso
        </span>
      )}
    </form>
  );
}
