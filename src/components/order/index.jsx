import React, { useState } from "react";
import OrderItem from "../order-item.jsx";

function Order({ orderId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex w-full p-3 justify-between">
      <div>id do pedido: {orderId}</div>
      <div
        onClick={() => setModalIsOpen(!modalIsOpen)}
        className="px-2 text-[#646cff] font-medium cursor-pointer"
      >
        Ver
      </div>
      {modalIsOpen && (<OrderItem orderId={orderId} handleClose={() => setModalIsOpen(false)}/>)}
    </div>
  );
}

export default Order;
