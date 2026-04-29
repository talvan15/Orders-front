import {
  createOrder,
  createProduct,
  fetchClients,
  fetchProducts,
} from "@/lib/axios";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function OrderForm() {
  const [clientId, setClientId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchClients().then((data) => setClients(data));
    fetchProducts().then((data) => setProducts(data));
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
      console.log(newOrder);
      await createOrder(newOrder);
      setSuccess("Pedido criado com sucesso!");
      setQuantity(1);
      setClientId("");
      setProductId("");
    } catch {
      setError("Erro ao criar pedido.");
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
        <Select onValueChange={(value) => setClientId(value)} value={clientId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {clients &&
                clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setProductId(value)}
          value={productId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {products &&
                products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex gap-3">
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="p-1 border border-gray-400 rounded-l"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Pedido"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
}

export default OrderForm;
