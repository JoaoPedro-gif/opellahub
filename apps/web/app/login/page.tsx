"use client";

import "./style.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  return (
    <main className="login-page">

      
        <div className="login-card">

          <div className="brand">
            Opella<span>Hub</span>
          </div>

          <h2>Login</h2>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >

          <label>E-mail</label>
          <input type="text" placeholder="e-mail" />

          <label>Senha</label>
          <input type="password" placeholder="senha" />

          <button type="submit">
            LOGIN
          </button>

        </form>

        <p>
          Não possui conta?{" "}
          <span onClick={() => router.push("/cadastro")}>
            Cadastre-se
          </span>
        </p>

      </div>

    </main>
  );
}
