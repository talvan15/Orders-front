import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

function Client({ id, name, email, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [saving, setSaving] = useState(false);

  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(id, { name: editedName, email: editedEmail });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition">
      {editing ? (
        <div className="flex flex-col gap-3">
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
          />

          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-700 disabled:opacity-60"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
              {initials || "CL"}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">{name}</h3>
              <p className="text-sm text-slate-500">{email}</p>
            </div>
          </div>

          {/* 🔥 Ícones ajustados */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-green-50 transition"
              title="Editar cliente"
            >
              <Pencil size={16} className="text-green-600" />
            </button>

            <button
              onClick={() => onDelete(id)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-200 hover:bg-red-50 transition"
              title="Excluir cliente"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;