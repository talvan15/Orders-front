import Order from "@/components/order";
import { fetchOrders } from "@/lib/axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setError("");
      })
      .catch(() => {
        setError("Não foi possível carregar os pedidos.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = `
        ${order.id}
        ${order.client_name || ""}
        ${order.product_name || ""}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [orders, search]);

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="w-[90%] max-w-6xl mx-auto py-8">
        {/* HEADER */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Pedidos</h2>
            <p className="text-sm text-slate-500 mt-1">
              Gerencie os pedidos cadastrados no sistema.
            </p>
          </div>

          <Link
            to="/pedidos/create/"
            className="bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Novo pedido
          </Link>
        </section>

        {/* CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total de pedidos</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {orders.length}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pedidos encontrados</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {filteredOrders.length}
            </h3>
          </div>
        </section>

        {/* LISTA */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Lista de pedidos
              </h2>
              <p className="text-sm text-slate-500">
                Busque pedidos por cliente, produto ou ID.
              </p>
            </div>

            <input
              type="text"
              placeholder="Buscar pedido..."
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
            ) : filteredOrders.length === 0 ? (
              <p className="text-center text-slate-500 py-12">
                Nenhum pedido encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredOrders.map((order) => (
                  <Order
                    key={order.id}
                    orderId={order.id}
                    clientId={order.client_id}
                    clientName={order.client_name}
                    productId={order.product_id}
                    productName={order.product_name}
                    quantity={order.quantity}
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

export default Orders;