import Axios from "axios";

export const ClientApi = Axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { "Content-Type": "application/json" },
});

export const ProductApi = Axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export const OrderApi = Axios.create({
  baseURL: "http://localhost:8002/api/v1/",
  headers: { "Content-Type": "application/json" },
});

// ---------------- CLIENTS ----------------

export const fetchClients = () => {
  return ClientApi.get("clients")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar clientes: ", err);
      throw err;
    });
};

export const createClient = (data) => {
  return ClientApi.post("clients", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar cliente: ", err);
      throw err;
    });
};

export const fetchClient = (id) => {
  return ClientApi.get(`clients/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar o cliente: ", err);
      throw err;
    });
};

export const updateClient = (id, data) => {
  return ClientApi.put(`clients/${id}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao atualizar cliente: ", err);
      throw err;
    });
};

export const deleteClient = (id) => {
  return ClientApi.delete(`clients/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao excluir cliente: ", err);
      throw err;
    });
};

// ---------------- PRODUCTS ----------------

export const fetchProducts = () => {
  return ProductApi.get("products/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar produtos: ", err);
      throw err;
    });
};

export const createProduct = (data) => {
  return ProductApi.post("products/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar produto: ", err);
      throw err;
    });
};

export const fetchProduct = (id) => {
  return ProductApi.get(`products/${id}/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar produto: ", err);
      throw err;
    });
};

// ---------------- ORDERS ----------------

export const fetchOrders = () => {
  return OrderApi.get("orders/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar pedidos: ", err);
      throw err;
    });
};

export const fetchOrder = (id) => {
  return OrderApi.get(`orders/${id}/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar pedido: ", err);
      throw err;
    });
};

export const createOrder = (data) => {
  return OrderApi.post("orders/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar pedido: ", err);
      throw err;
    });
};

// ---------------- PRODUCT-ORDERS ----------------

export const fetchProductOrders = () => {
  return OrderApi.get("product-orders/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar pedidos com produtos: ", err);
      throw err;
    });
};

export const fetchProductOrder = (id) => {
  return OrderApi.get(`product-orders/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar produto do pedido: ", err);
      throw err;
    });
};