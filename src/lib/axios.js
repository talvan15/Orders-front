import Axios from "axios";

// ---------------- APIs ----------------

export const ClientApi = Axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { "Content-Type": "application/json" },
});

export const OrderApi = Axios.create({
  baseURL: "http://127.0.0.1:8001/",
  headers: { "Content-Type": "application/json" },
});

export const ProductApi = Axios.create({
  baseURL: "http://127.0.0.1:8002/",
  headers: { "Content-Type": "application/json" },
});

// ---------------- CLIENTS ----------------

export const fetchClients = async () => {
  const res = await ClientApi.get("clients");
  return res.data;
};

export const createClient = async (data) => {
  const res = await ClientApi.post("clients", data);
  return res.data;
};

export const fetchClient = async (id) => {
  const res = await ClientApi.get(`clients/${id}`);
  return res.data;
};

export const updateClient = async (id, data) => {
  const res = await ClientApi.put(`clients/${id}`, data);
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await ClientApi.delete(`clients/${id}`);
  return res.data;
};

// ---------------- PRODUCTS ----------------

export const fetchProducts = async () => {
  const res = await ProductApi.get("products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await ProductApi.post("products", data);
  return res.data;
};

export const fetchProduct = async (id) => {
  const res = await ProductApi.get(`products/${id}`);
  return res.data;
};

// ---------------- ORDERS ----------------

export const fetchOrders = async () => {
  const res = await OrderApi.get("orders");
  return res.data;
};

export const fetchOrder = async (id) => {
  const res = await OrderApi.get(`orders/${id}`);
  return res.data;
};

export const createOrder = async (data) => {
  const res = await OrderApi.post("orders", data);
  return res.data;
};

// ---------------- PRODUCT ORDERS ----------------

export const fetchProductOrders = async () => {
  const res = await OrderApi.get("product-orders");
  return res.data;
};

export const fetchProductOrder = async (id) => {
  const res = await OrderApi.get(`product-orders/${id}`);
  return res.data;
};