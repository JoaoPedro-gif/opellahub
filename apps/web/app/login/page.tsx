import "./style.css";

export default function LoginPage() {
  return (
    <main className="login-page">

      <div className="login-container">

        {/* LADO ESQUERDO */}
        <div className="login-left">

          <h1>
            Bem-vindo ao <span>OpellaHub</span>
            </h1>

          <p>Acesse sua conta agora</p>

          <button>
            ENTRAR
          </button>

        </div>

        {/* LADO DIREITO */}
        <div className="login-right">

          <h2>CRIAR SUA CONTA</h2>

          <form>

            <input
              type="text"
              placeholder="NOME"
            />

            <input
              type="email"
              placeholder="E-MAIL"
            />

            <input
              type="password"
              placeholder="SENHA"
            />

            <button type="submit">
              CADASTRAR
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}