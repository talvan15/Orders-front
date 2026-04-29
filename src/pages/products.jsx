import Product from '@/components/product';
import { fetchProducts } from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex w-full justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <Link to={"/produtos/create/"} className="border border-gray-400 rounded-lg p-1">Adicionar</Link>
      </div>
      <div className="flex flex-col justify-start items-center border border-gray-400 rounded-lg min-h-[50vh]">
        {products &&
          products.map((product) => (
            <Product key={product.id} name={product.name} price={product.price} />
          ))}
      </div>
    </div>
  );
}

export default Products