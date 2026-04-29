import React, { useState } from "react";
import { Eye } from "lucide-react";

function Order({ id, clientId, productId, quantity }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition">
      
      {/* RESUMO DO PEDIDO */}
      <div className="flex items-center justify-between">
        
        <div>
          <h3 className="font-semibold text-slate-800">
            Pedido #{id}
          </h3>

          <p className="text-sm text-slate-500">
            Cliente: {clientId} • Produto: {productId}
          </p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* DETALHES */}
      {open && (
        <div className="mt-3 text-sm text-slate-600 space-y-1">
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Cliente ID:</strong> {clientId}</p>
          <p><strong>Produto ID:</strong> {productId}</p>
          <p><strong>Quantidade:</strong> {quantity}</p>
        </div>
      )}
    </div>
  );
}

export default Order;