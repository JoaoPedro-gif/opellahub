"use client";

import "../chamados/style.css";
import "./style.css";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AbrirChamadoPage() {

  const router = useRouter();

  const handleSelect = (team: string) => {

    if (team === "sistema") {
      window.open(
        "https://sanofiservices.service-now.com/onesupport?id=ec_pro_homepage",
        "_blank"
      );
      return;
    }

    router.push(`/chamados?team=${team}`);
  };

  return (
    <main className="chamados-layout">

      <Sidebar active="criar" />

      <section className="select-team-page">

        {/* TÍTULO */}
        <h1>
          Para continuar, escolha para qual time deseja abrir o chamado
        </h1>

        {/* BOTÕES */}
        <div className="teams-grid">

          <button className="team dados" onClick={() => handleSelect("dados")}>
            Time de Dados
          </button>

          <button className="team sfe" onClick={() => handleSelect("sfe")}>
            Time de SFE
          </button>

          <button className="team comercial" onClick={() => handleSelect("comercial")}>
            Commercial Operations
          </button>

          <button className="team sistema" onClick={() => handleSelect("sistema")}>
            Sistemas
          </button>

        </div>

        {/* INSTRUÇÕES */}
        <h2 className="section-title">
          📌 Como direcionar sua solicitação
        </h2>

        <div className="info-grid">

          {/* DADOS */}
          <div className="info-card dados">
            <h3>📊 Time de Dados</h3>
            <ul>
              <li>Atualizações de Dados</li>
              <li>Inconsistência de Dados</li>
              <li>Acessos a Reports</li>
            </ul>
            <p className="warning">
              Atenção: Não se aplica para novos projetos.
            </p>
          </div>

          {/* SFE */}
          <div className="info-card sfe">
            <h3>📱 Time SFE</h3>
            <ul>
              <li>Cotas</li>
              <li>Prêmios</li>
              <li>Painéis</li>
              <li>Pharmaviews</li>
            </ul>
          </div>

          {/* COMERCIAL */}
          <div className="info-card comercial">
            <h3>🏪 Commercial Operations</h3>
            <ul>
              <li>Opella no Ponto</li>
              <li>Fidelize</li>
            </ul>
          </div>

          {/* SISTEMAS */}
          <div className="info-card sistema">
            <h3>🧩 Sistemas</h3>
            <ul>
              <li>My CRM</li>
              <li>TRAX</li>
            </ul>
          </div>

        </div>

        {/* ONESUPPORT */}
        <div
          className="onesupport"
          onClick={() =>
            window.open(
              "https://sanofiservices.service-now.com/onesupport?id=ec_pro_homepage",
              "_blank"
            )
          }
        >
          ⚙ Não encontrou sua solicitação?  
          <span>Acessar OneSupport ↗</span>
        </div>

      </section>

    </main>
  );
}