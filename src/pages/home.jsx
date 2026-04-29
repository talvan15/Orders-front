import Client from "@/components/cliente";
import {
  fetchClients,
  updateClient,
  deleteClient,
} from "@/lib/axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients()
      .then((data) => {
        setClients(data);
        setError("");
      })
      .catch(() => {
        setError("Não foi possível carregar os clientes.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const text = `${client.name} ${client.email}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [clients, search]);

  const handleUpdateClient = async (id, data) => {
    const updated = await updateClient(id, data);

    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? updated : client
      )
    );
  };

  const handleDeleteClient = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (!confirmDelete) return;

    await deleteClient(id);

    setClients((prev) =>
      prev.filter((client) => client.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="w-[90%] max-w-6xl mx-auto py-8">
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Clientes</h2>
            <p className="text-sm text-slate-500 mt-1">
              Gerencie seus clientes cadastrados no sistema.
            </p>
          </div>

          <Link
            to="/cliente/create/"
            className="bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Novo cliente
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total de clientes</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {clients.length}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Clientes encontrados</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {filteredClients.length}
            </h3>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Lista de clientes
              </h2>
              <p className="text-sm text-slate-500">
                Busque, edite ou exclua clientes cadastrados.
              </p>
            </div>

            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
            />
          </div>

          <div className="p-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              </div>
            ) : error ? (
              <p className="text-center text-red-500 py-12">{error}</p>
            ) : filteredClients.length === 0 ? (
              <p className="text-center text-slate-500 py-12">
                Nenhum cliente encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredClients.map((client) => (
                  <Client
                    key={client.id}
                    id={client.id}
                    name={client.name}
                    email={client.email}
                    onUpdate={handleUpdateClient}
                    onDelete={handleDeleteClient}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;