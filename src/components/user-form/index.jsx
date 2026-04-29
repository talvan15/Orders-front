import React, { useState } from "react";
import { data, Link } from "react-router-dom";

function UserForm({ mode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = ({ mode, formData, id }) => {
    if (mode === "register") {
      data = { name: formData.name, email: formData.email };

      
    }
  };

  return (
    <form>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Nome:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="p-1 rounded-lg border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="p-1 rounded-lg border border-gray-400"
        />
      </div>
      {mode === "edit" && (
        <>
          <div className="border-t-2 border-gray-400 py-1 mt-5" />
          <div className="flex flex-col gap-1">
            <label htmlFor="">senha atual:</label>
            <input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="p-1 rounded-lg border border-gray-400"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="">{mode === "edit" ? "nova senha:" : "senha:"}</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="p-1 rounded-lg border border-gray-400"
        />
      </div>
      {mode === "register" ||
        (mode === "edit" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="">confirme sua senha:</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-1 rounded-lg border border-gray-400"
            />
          </div>
        ))}

      <button className="bg-[#535bf2]">
        {mode === "register"
          ? "Cadastrar"
          : mode === "login"
          ? "Entrar"
          : "Salvar alterações"}
      </button>

      {/* <div className="flex flex-col">
        <span>Ainda não tem uma conta?</span>
        <Link>Cadastre-se</Link>
      </div> */}
    </form>
  );
}

export default UserForm;
