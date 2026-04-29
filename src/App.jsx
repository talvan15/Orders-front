import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import ClientForm from "./pages/cliente-form";
import ProductForm from "./pages/product-form";
import Orders from "./pages/orders";
import OrderForm from "./pages/order-form";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos/" element={<Products />} />
        <Route path="/cliente/create" element = {<ClientForm/>}/>
        <Route path="/produtos/create" element = {<ProductForm/>}/>
        <Route path="/pedidos/" element = {<Orders/>}/>
        <Route path="/pedidos/create" element = {<OrderForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
