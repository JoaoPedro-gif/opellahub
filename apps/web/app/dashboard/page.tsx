"use client";

import "../chamados/style.css";
import "./style.css";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (
    <main className="chamados-layout">

      <Sidebar active="dashboard" />

      <section className="dashboard-content">

        <header className="dashboard-header">

          <h1>
            Dashboard
          </h1>

          <div className="profile">

            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Perfil"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                👤
              </div>
            )}

            <span className="profile-name">
              {user?.username || "Usuário"}
            </span>

          </div>

        </header>

        <div className="cards-grid">

          <div className="dashboard-card">
            <h2>12</h2>
            <p>Chamados Abertos</p>
          </div>

          <div className="dashboard-card">
            <h2>5</h2>
            <p>Em Andamento</p>
          </div>

          <div className="dashboard-card">
            <h2>38</h2>
            <p>Resolvidos</p>
          </div>

          <div className="dashboard-card danger">
            <h2>2</h2>
            <p>Críticos</p>
          </div>

        </div>

        <div className="recent-tickets">

          <div className="tickets-header">
            <h2>Chamados recentes</h2>
          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Status</th>
                <th>Prioridade</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>#1024</td>
                <td>Erro no sistema interno</td>
                <td>
                  <span className="status open">
                    Aberto
                  </span>
                </td>
                <td>Alta</td>
              </tr>

              <tr>
                <td>#1025</td>
                <td>Solicitação de acesso</td>
                <td>
                  <span className="status progress">
                    Em andamento
                  </span>
                </td>
                <td>Média</td>
              </tr>

              <tr>
                <td>#1026</td>
                <td>Falha de conexão</td>
                <td>
                  <span className="status resolved">
                    Resolvido
                  </span>
                </td>
                <td>Baixa</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}