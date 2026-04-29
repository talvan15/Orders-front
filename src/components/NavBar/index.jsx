import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const baseLink =
    "px-4 py-2 rounded-xl text-sm font-medium transition";

  const activeLink = "bg-slate-100 text-slate-900";
  const inactiveLink =
    "text-slate-500 hover:text-slate-900 hover:bg-slate-50";

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="w-[90%] max-w-6xl mx-auto flex items-center justify-between py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-slate-900">
          Gestorix
        </h1>

        {/* Menu */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Clientes
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Produtos
          </NavLink>

          <NavLink
            to="/pedidos"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Pedidos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;