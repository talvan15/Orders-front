import { fetchOrder } from "@/lib/axios";
import React, { useEffect, useState } from "react";

function OrderItem({ orderId, handleClose }) {
  const [order, setOrder] = useState();

  useEffect(() => {
    fetchOrder(orderId).then((data) => setOrder(data));
  }, []);


  return (
    <div className="absolute flex flex-col w-[40%] p-5 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-400 rounded-lg gap-5">
      <h3 className="text-xl font-bold">Pedido --- {orderId}</h3>
      {order && (
        <div className="w-full space-y-5">
          <div className="w-full">
            <h3 className="text-lg font-bold">Cliente: </h3>
            <div>
              <span className="font-bold">E-mail: </span>
              {order.client.email}
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-bold">Produto: </h3>
            <div>
              <span className="font-bold">Nome: </span>
              {order.product.name}
            </div>
            <div>
              <span className="font-bold">Preço: </span>
              {order.product.price}
            </div>
            <div>
              <span className="font-bold">quantidade: </span>
              {order.quantity}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-bold">Produto: </h3>
            <div>
              <span className="font-bold">valor total: </span>
              {order.total_value}
            </div>
          </div>
        </div>
      )}
      <button onClick={handleClose}>Fechar</button>
    </div>
  );
}

export default OrderItem;
