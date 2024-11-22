import React, { useState, useEffect, useRef } from "react";
import "../styles/components/Header.css";
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";
import API from '../services/api'; // Asegúrate de importar tu API

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchBoxRef = useRef(null); // Referencia para el cajón de búsqueda
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menú abierto:", !isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const allProducts = await API.getProducts();
        const filtered = allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      }
    } else {
      setFilteredProducts([]);
    }
  };

  const handleClickOutside = (event) => {
    // Si el clic ocurrió fuera del cajón de búsqueda, ciérralo
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const gotoLogin = () => {
    navigate("/login");
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
        <button className="reporte-btn" onClick={gotoLogin}>
          <i className="report-icon">👤</i>
          <span>Reportes</span>
        </button>
        <button className="carrito-btn" onClick={gotoCart}>
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

      {isSearchVisible && (
        <div className="search-box" ref={searchBoxRef}>
          <input
            type="text"
            placeholder="¿Qué artículo deseas buscar?"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredProducts.length > 0 && (
            <div className="search-results">
              {filteredProducts.map((product) => (
                <div key={product.id} className="search-result-item">
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

