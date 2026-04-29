import Order from '@/components/order';
import { fetchOrders, fetchProductOrders } from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Orders() {
  const [productOrders, setProductOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders()
        .then((data) => setProductOrders(data))
        .catch((error) => {
          console.error("Erro ao buscar pedidos:", error);
        });
    }, []);
  
  
    return (
      <div className="w-[90%] mx-auto mt-10">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Pedidos</h2>
          <Link to={"/pedidos/create/"} className="border border-gray-400 rounded-lg p-1">Adicionar</Link>
        </div>
        <div className="flex flex-col justify-start items-center border border-gray-400 rounded-lg min-h-[50vh]">
          {productOrders &&
            productOrders.map((order) => (
              <Order key={order.order_id} orderId={order.order_id}/>
            ))}
        </div>
      </div>
    );
}

export default Orders