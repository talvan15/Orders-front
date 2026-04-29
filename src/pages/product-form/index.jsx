import { createProduct } from "@/lib/axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newProduct = {
        name,
        price: parseFloat(price),
      };

      await createProduct(newProduct);

      setSuccess("Produto criado com sucesso!");
      setName("");
      setPrice("");

      setTimeout(() => {
        navigate("/produtos");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Erro ao criar produto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="w-[90%] max-w-3xl mx-auto py-8">
        <section className="mb-8">
          <Link
            to="/produtos"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition"
          >
            ← Voltar para produtos
          </Link>

          <h2 className="text-3xl font-bold text-slate-900 mt-4">
            Cadastrar produto
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Preencha os dados abaixo para adicionar um novo produto ao sistema.
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
                Nome do produto
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Notebook Dell"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preço
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 1999.90"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link
                to="/produtos"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition text-center"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar produto"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}