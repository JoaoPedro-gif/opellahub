"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {

  const router = useRouter();

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email.includes("@opella")) {
      setError("Use um email @opella");
      return;
    }

    const code = generateCode();

    // salvar código temporário
    localStorage.setItem("verificationCode", code);
    localStorage.setItem("email", email);

    // enviar email
    await fetch("/api/send-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    alert("Código enviado!");

    router.push("/verificar-codigo");
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="brand">
          Opella<span>Hub</span>
        </div>

        <h2>Criar conta</h2>

        <label className="avatar-upload">

          {preview ? (
            <img src={preview} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              👤
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

        </label>

        <form onSubmit={handleSubmit}>

          <label>Nome</label>
          <input type="text" placeholder="Seu nome completo" required />

          <label>Usuário</label>
          <input type="text" placeholder="Como deseja ser chamado" required />

          <label>E-mail</label>
          <input
            type="email"
            placeholder="seuemail@opella"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input type="password" placeholder="Senha" required />

          <label>Confirmar Senha</label>
          <input type="password" placeholder="Confirme a senha" required />

          {error && <span className="error">{error}</span>}

          <button type="submit">
            CRIAR CONTA
          </button>

        </form>

        <p>
          Já possui conta?{" "}
          <span onClick={() => router.push("/login")}>
            Fazer login
          </span>
        </p>

      </div>

    </main>
  );
}
