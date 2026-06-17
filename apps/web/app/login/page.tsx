"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");

    try {

      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        setError(result.message);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      router.push("/dashboard");

    } catch (err) {

      console.error(err);

      setError(
        "Erro ao realizar login."
      );
    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="brand">
          Opella<span>Hub</span>
        </div>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <label>E-mail</label>

          <input
            type="email"
            placeholder="usuario@opella.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Senha</label>

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <span className="error">
              {error}
            </span>
          )}

          <button type="submit">
            LOGIN
          </button>

        </form>

        <p>
          Não possui conta?{" "}
          <span
            onClick={() =>
              router.push("/dashboard")
            }
          >
            Cadastre-se
          </span>
        </p>

      </div>

    </main>
  );
}