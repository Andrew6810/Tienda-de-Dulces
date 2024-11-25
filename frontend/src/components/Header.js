import React, { useState, useRef } from "react";
import "../styles/components/Header.css";
import Modal from "./Ofertas"; // Importa el componente Modal
import PagNosotros from "./PagNosotros"; // Componente "Nosotros"
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false); // Estado para el modal de mantenimiento
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false); // Estado para el modal "Nosotros"
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  
  return (
    <header className="header">
      <div className="logo">
        <h1>
          CANDY <span className="yellow-rectangle">SHOP</span>
        </h1>
      </div>

      <button
        className="menu-btn"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/")}>
            <a>Home</a>
          </li>
          <li onClick={() => setIsNosotrosOpen(true)}>
            <a>Nosotros</a>
          </li>
          <li onClick={() => setIsMaintenanceOpen(true)}> {/* Mostrar modal de mantenimiento */}
            <a>Ofertas</a>
          </li>
        </ul>
      </nav>

      <div className="icons">
        <button className="carrito-btn" onClick={() => navigate("/cart")}>
          <i className="cart-icon">🛒</i>
          <span>Carrito</span>
        </button>
        <button className="contact-btn">
          <i className="phone-icon">📞</i>
          <span>Contacto</span>
        </button>
        <button className="buscar-btn" onClick={toggleSearch}>
          <i className="lupa-icon">🔍</i>
          <span>Buscar</span>
        </button>
      </div>

      {/* Modal "Nosotros" */}
      <PagNosotros
        isOpen={isNosotrosOpen}
        onClose={() => setIsNosotrosOpen(false)}
      />

      {/* Modal "Mantenimiento" */}
      <Modal
        isOpen={isMaintenanceOpen}
        onClose={() => setIsMaintenanceOpen(false)}
        title="OFERTAS"
      >
        <p>Estamos trabajando para mejorar nuestra sección de ofertas. ¡Vuelve pronto!</p>
      </Modal>
    </header>
  );
}

export default Header;