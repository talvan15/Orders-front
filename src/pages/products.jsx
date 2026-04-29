import Product from "@/components/product";
import { fetchProducts } from "@/lib/axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.products || data);
        setError("");
      })
      .catch(() => {
        setError("Não foi possível carregar os produtos.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="w-[90%] max-w-6xl mx-auto py-8">
        {/* HEADER */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Produtos</h2>
            <p className="text-sm text-slate-500 mt-1">
              Gerencie seus produtos cadastrados no sistema.
            </p>
          </div>

          <Link
            to="/produtos/create/"
            className="bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Novo produto
          </Link>
        </section>

        {/* CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total de produtos</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {products.length}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Produtos encontrados</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {filteredProducts.length}
            </h3>
          </div>
        </section>

        {/* LISTA */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Lista de produtos
              </h2>
              <p className="text-sm text-slate-500">
                Busque produtos cadastrados no sistema.
              </p>
            </div>

            <input
              type="text"
              placeholder="Buscar por nome..."
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
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-slate-500 py-12">
                Nenhum produto encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredProducts.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
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

export default Products;