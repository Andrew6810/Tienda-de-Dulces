import React, { useState } from "react";
import "../styles/components/Header.css"; // Archivo CSS para estilos específicos del header
import "../styles/Search.css"; // Importar los estilos del cuadro de búsqueda
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla si el menú está abierto
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Controla la visibilidad del cuadro de búsqueda
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menú abierto:", !isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible); // Alternar la visibilidad del cuadro de búsqueda
  };

  const gotoCart = () => {
    navigate("/cart");
  }

  const gotoHome = () => {
    navigate("/");
  }

  return (
    <header className="header">
      <div className="logo">
        <h1>
          CANDY <span className="yellow-rectangle">SHOP</span>
        </h1>
      </div>

      {/* Botón del menú para pantallas pequeñas */}

      <button
        className="menu-btn"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
      >
        ☰ {/* Icono de menú hamburguesa */}
      </button>

      {/* Enlaces de navegación */}
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={gotoHome}>
            <a>Home</a>
          </li>
          <li>
            <a href="#comprar">Comprar</a>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#super-sale">Ofertas</a>
          </li>
        </ul>
      </nav>

      <div className="icons">
        <button className="carrito-btn" onClick={gotoCart }>
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

      {/* Cuadro de búsqueda */}
      {isSearchVisible && (
        <div className="search-box">
          <input type="text" placeholder="¿Qué artículo deseas buscar?" />
        </div>
      )}
    </header>
  );
}

export default Header;
