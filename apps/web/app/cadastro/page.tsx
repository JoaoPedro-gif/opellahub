"use client";

import "./style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateCode = () => {
    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");

    if (!email.endsWith("@opella.com")) {
      setError(
        "Use um email corporativo @opella.com"
      );
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula e 1 caractere especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const code = generateCode();

    localStorage.setItem(
      "verificationCode",
      code
    );

    localStorage.setItem(
      "verificationEmail",
      email
    );
    localStorage.setItem(
      "username",
      username
    );

    try {

      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
            code,
            avatar: preview,
          }),
        }
      );

      const responseText =
        await response.text();

      console.log(
        "Resposta API:",
        responseText
      );

      const result =
        JSON.parse(responseText);

      if (!result.success) {
        setError(
          "Erro ao salvar usuário."
        );
        return;
      }

      // envio do código por email
      await fetch("/api/send-code", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      router.push(
        "/verificar-codigo"
      );

    } catch (err) {

      console.error(err);

      setError(
        "Erro ao criar a conta."
      );
    }
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);
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
            <img
              src={preview}
              alt="Foto de perfil"
              className="avatar-img"
            />
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
          <input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <label>Usuário</label>
          <input
            type="text"
            placeholder="Como deseja ser chamado"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

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
          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? "🔓" : "👁️"}
            </button>

          </div>

          <small className="password-info">
            Mínimo 8 caracteres, 1 letra maiúscula e 1 caractere especial.
          </small>

          <label>Confirmar Senha</label>
          <div className="password-wrapper">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? "🔓" : "👁️"}
            </button>

          </div>

          {error && (
            <span className="error">
              {error}
            </span>
          )}

          <button type="submit">
            CRIAR CONTA
          </button>

        </form>

        <p>
          Já possui conta?{" "}
          <span
            onClick={() =>
              router.push("/login")
            }
          >
            Fazer login
          </span>
        </p>

      </div>

    </main>
  );
}