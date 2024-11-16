import React, { useState, useEffect } from "react";
import "../styles/components/Header.css";
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";
import API from '../services/api'; // Asegúrate de importar tu API

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para almacenar productos filtrados
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menú abierto:", !isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm(''); // Limpia el término de búsqueda al abrir o cerrar
    setFilteredProducts([]); // Limpia los productos filtrados
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
        <div className="search-box">
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
