"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ active }: { active: string }) {

  const router = useRouter();

  return (
    <aside className="sidebar">

      <div className="logo">
        Opella<span>Hub</span>
      </div>

      <nav className="sidebar-menu">

        <Link href="/dashboard">
          <button className={active === "dashboard" ? "active" : ""}>
            Dashboard
          </button>
        </Link>

        <Link href="/chamados">
          <button className={active === "chamados" ? "active" : ""}>
            Chamados
          </button>
        </Link>

        <button
          className={active === "criar" ? "active" : ""}
          onClick={() => router.push("/abrir-chamados")}
        >
          Criar Chamado
        </button>

        <button>Reports</button>

        <button>Configurações</button>

      </nav>

    </aside>
  );
}
