import {
  createOrder,
  fetchClients,
  fetchProducts,
} from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderForm() {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const clientsData = await fetchClients();
        const productsData = await fetchProducts();

        setClients(clientsData);
        setProducts(productsData);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar clientes e produtos.");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newOrder = {
        client_id: clientId,
        product_id: productId,
        quantity: parseInt(quantity),
      };

      await createOrder(newOrder);

      setSuccess("Pedido criado com sucesso!");
      setClientId("");
      setProductId("");
      setQuantity(1);

      setTimeout(() => {
        navigate("/pedidos");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Erro ao criar pedido. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="w-[90%] max-w-3xl mx-auto py-8">
        <section className="mb-8">
          <Link
            to="/pedidos"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition"
          >
            ← Voltar para pedidos
          </Link>

          <h2 className="text-3xl font-bold text-slate-900 mt-4">
            Cadastrar pedido
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Selecione o cliente, produto e quantidade para registrar um novo
            pedido.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Cliente
              </label>

              <Select
                onValueChange={(value) => setClientId(value)}
                value={clientId}
                disabled={loadingData}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {clients.map((client) => (
                      <SelectItem
                        key={client.id}
                        value={String(client.id)}
                      >
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Produto
              </label>

              <Select
                onValueChange={(value) => setProductId(value)}
                value={productId}
                disabled={loadingData}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {products.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={String(product.id)}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quantidade
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link
                to="/pedidos"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition text-center"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={loading || loadingData}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar pedido"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}