"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerificarCodigoPage() {

  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

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

      localStorage.removeItem(
        "verificationCode"
      );

      localStorage.removeItem(
        "verificationEmail"
      );

      alert(
        "Cadastro confirmado com sucesso!"
      );

      router.push("/login");

    } catch (err) {

      console.error(err);

      setError(
        "Erro ao validar o código."
      );
    }
  };

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