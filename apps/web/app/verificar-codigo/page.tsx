"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerificarCodigoPage() {

  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const correctCode = localStorage.getItem("verificationCode");


  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (code !== correctCode) {
      setError("Código inválido");
      return;
    }

    setError("");

    alert("Cadastro confirmado!");

    router.push("/dashboard");
  };

  return (
    <main className="login-page">

      <div className="login-card">

        {/* LOGO */}
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
            onChange={(e) => setCode(e.target.value)}
          />

          {error && <span className="error">{error}</span>}

          <button type="submit">
            CONFIRMAR
          </button>

        </form>

      </div>

    </main>
  );
}