import Order from "@/components/order";
import { fetchOrders } from "@/lib/axios";
import React, { useEffect, useState, useMemo } from "react";
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
        setError("Erro ao buscar pedidos");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        String(order.id).includes(search) ||
        order.client_name?.toLowerCase().includes(search.toLowerCase()) ||
        order.product_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex w-full justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Pedidos</h2>

        <Link
          to="/pedidos/create/"
          className="border border-gray-400 rounded-lg p-2"
        >
          Adicionar
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar pedido..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border p-2 rounded-lg w-full"
      />

      <div className="flex flex-col justify-start items-center border border-gray-400 rounded-lg min-h-[50vh] w-full">
        {loading ? (
          <p className="mt-10">Carregando...</p>
        ) : error ? (
          <p className="text-red-500 mt-10">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="mt-10">Nenhum pedido encontrado</p>
        ) : (
          filteredOrders.map((order) => (
            <Order
              key={order.id}
              orderId={order.id}
              clientId={order.client_id}
              clientName={order.client_name}
              productId={order.product_id}
              productName={order.product_name}
              quantity={order.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;