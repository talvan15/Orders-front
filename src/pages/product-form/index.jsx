import { createProduct } from "@/lib/axios";
import React, { useState } from "react";

function ProductForm() {
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
      const newProduct = { name, price };
      await createProduct(newProduct);
      setSuccess("Produto criado com sucesso!");
      setName("");
      setPrice("");
    } catch {
      setError("Erro ao criar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <h2 className="text-2xl font-bold mb-5">Cadastrar Produto</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex gap-3">
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-1 border border-gray-400 rounded-l"
          />
        </div>
        <div className="flex gap-3">
          <label>preço:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="p-1 border border-gray-400 rounded-l"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Produto"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
}

export default ProductForm;
