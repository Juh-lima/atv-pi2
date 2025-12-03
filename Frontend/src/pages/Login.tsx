import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; 

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">AnimalHotels</h2>
        <p className="login-subtitle">Entre na sua conta</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="login-input"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="login-demo">
            <p>Credenciais de demonstração:</p>
            <p>Email: demo@animalhotels.com</p>
            <p>Senha: password</p>
          </div>
        </form>
      </div>
    </div>
  );
};
