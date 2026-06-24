"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerificarCodigoPage() {

  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [username, setUsername] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");

    try {

      const email = localStorage.getItem(
        "verificationEmail"
      );

      if (!email) {
        setError(
          "E-mail de verificação não encontrado."
        );
        return;
      }

      const response = await fetch(
        "/api/verify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        setError(
          result.message ||
            "Código inválido."
        );
        return;
      }

      setUsername(
        localStorage.getItem("username") || ""
      );

      localStorage.removeItem(
        "verificationCode"
      );

      localStorage.removeItem(
        "verificationEmail"
      );

      setVerified(true);

    } catch (err) {

      console.error(err);

      setError(
        "Erro ao validar o código."
      );
    }
  };

  if (verified) {
    return (
      <main className="login-page">

        <div className="login-card welcome-card">

          <div className="brand">
            Opella<span>Hub</span>
          </div>

          <h2>
            ✅ Cadastro Confirmado
          </h2>

          <p className="welcome-text">
            Bem-vindo <strong>{username}</strong>!
          </p>

          <p className="welcome-text">
            Sua plataforma de chamados e suporte.
          </p>

          <button
            onClick={() =>
              router.push("/login")
            }
          >
            IR PARA LOGIN
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="brand">
          Opella<span>Hub</span>
        </div>

        <h2>Confirmar código</h2>

        <p className="info-text">
          Digite o código enviado para seu e-mail
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            required
          />

          {error && (
            <span className="error">
              {error}
            </span>
          )}

          <button type="submit">
            CONFIRMAR
          </button>

        </form>

      </div>

    </main>
  );
}
