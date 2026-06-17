"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import "./style.css";
import { useRouter } from "next/navigation";

export default function ChamadosPage() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const isAdmin = true;

  const tickets = [
    {
      id: "#1024",
      user: "Dimitri Debouch",
      initials: "OP",
      type: "Inconsistência de dados",
      description: "Os dados da bandeira Carrefour estão divergentes...",
      date: "05/12/2026",
      status: "Em andamento",
      priority: "Alta",
    },
    {
      id: "#1025",
      user: "Camila Nogueira",
      initials: "CA",
      type: "Erro dashboard",
      description: "Dashboard não carrega totalmente...",
      date: "05/12/2026",
      status: "Finalizado",
      priority: "Média",
    },
    {
      id: "#1026",
      user: "João Pedro",
      initials: "JP",
      type: "Acesso bloqueado",
      description: "Usuário sem acesso ao sistema...",
      date: "06/12/2026",
      status: "Aberto",
      priority: "Crítica",
    },
  ];

  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((ticket) => {

    const statusMatch =
      statusFilter.length === 0 ||
      statusFilter.includes(ticket.status);

    const priorityMatch =
      priorityFilter.length === 0 ||
      priorityFilter.includes(ticket.priority);

    const searchMatch =
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  return (
    <main className="chamados-layout">

      {/* ✅ SIDEBAR REUTILIZADO */}
      <Sidebar active="chamados" />

      {/* CONTEÚDO */}
      <section className="tickets-page">

        {/* HEADER */}
        <div className="tickets-header">

          <div>
            <h1>Chamados</h1>

            <p>
              Gerencie os chamados e reports do sistema
            </p>
          </div>

          <div className="header-actions">

            <div className="logged-user">

              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Foto do usuário"
                  className="logged-user-avatar"
                />
              ) : (
                <div className="logged-user-avatar-placeholder">
                  👤
                </div>
              )}

              <span className="logged-user-name">
                {user?.username || "Usuário"}
              </span>

            </div>

            <button
              className="new-ticket-btn"
              onClick={() => router.push("/abrir-chamados")}
            >
              + Novo chamado
            </button>

          </div>

        </div>

        {/* FILTROS */}
        <div className="tickets-filters">

          <input
            type="text"
            placeholder="Pesquisar chamado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* STATUS */}
          <div className="custom-select">
            <details>
              <summary>
                {statusFilter.length > 0
                  ? `${statusFilter.length} status selecionados`
                  : "Todos os status"}
              </summary>

              <div className="custom-options">

                <label>
                  <input
                    type="checkbox"
                    checked={statusFilter.length === 3}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStatusFilter([
                          "Aberto",
                          "Em andamento",
                          "Finalizado"
                        ]);
                      } else {
                        setStatusFilter([]);
                      }
                    }}
                  />
                  Selecionar todos
                </label>

                {["Aberto", "Em andamento", "Finalizado"].map((status) => (
                  <label key={status}>
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStatusFilter([...statusFilter, status]);
                        } else {
                          setStatusFilter(
                            statusFilter.filter((item) => item !== status)
                          );
                        }
                      }}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </details>
          </div>

          {/* PRIORIDADE */}
          <div className="custom-select">
            <details>
              <summary>
                {priorityFilter.length > 0
                  ? `${priorityFilter.length} prioridades`
                  : "Todas prioridades"}
              </summary>

              <div className="custom-options">

                <label>
                  <input
                    type="checkbox"
                    checked={priorityFilter.length === 4}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPriorityFilter([
                          "Baixa",
                          "Média",
                          "Alta",
                          "Crítica"
                        ]);
                      } else {
                        setPriorityFilter([]);
                      }
                    }}
                  />
                  Selecionar todos
                </label>

                {["Baixa", "Média", "Alta", "Crítica"].map((priority) => (
                  <label key={priority}>
                    <input
                      type="checkbox"
                      checked={priorityFilter.includes(priority)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPriorityFilter([...priorityFilter, priority]);
                        } else {
                          setPriorityFilter(
                            priorityFilter.filter((item) => item !== priority)
                          );
                        }
                      }}
                    />
                    {priority}
                  </label>
                ))}
              </div>
            </details>
          </div>

        </div>

        {/* TABELA */}
        <div className="tickets-table-wrapper">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Solicitante</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Status</th>
                <th>Prioridade</th>
                {isAdmin && <th>Editar</th>}
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (

                <tr key={ticket.id}>

                  <td>{ticket.id}</td>

                  <td>
                    <div className="user-info">
                      <div className="avatar">
                        {ticket.initials}
                      </div>
                      <span>{ticket.user}</span>
                    </div>
                  </td>

                  <td>{ticket.type}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.date}</td>

                  <td>
                    <span
                      className={`status ${
                        ticket.status === "Finalizado"
                          ? "finished"
                          : ticket.status === "Em andamento"
                          ? "processing"
                          : "open"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority ${
                        ticket.priority === "Crítica"
                          ? "critical"
                          : ticket.priority === "Alta"
                          ? "high"
                          : ticket.priority === "Média"
                          ? "medium"
                          : "low"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  {isAdmin && (
                    <td>
                      <button className="edit-btn">
                        Editar
                      </button>
                    </td>
                  )}

                </tr>

              ))}
            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}