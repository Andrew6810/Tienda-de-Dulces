// src/components/Header.js
import React from 'react';
import '../styles/components/Header.css';  // Archivo CSS para estilos específicos del header
import { Link } from 'react-router-dom'; // Importamos Link para poder navegar entre rutas


function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>CANDY <span>SHOP</span></h1>
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#comprar">Comprar</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#super-sale">Super Sale</a></li>
        </ul>
      </nav>
      <div className="icons">
        <Link>
          <i className="fas fa-shopping-cart" style={{ fontSize: '24px', color: 'black' }}></i>{/* Simula un ícono de carrito */}
        </Link>
        <button className="contact-btn">Contacto</button>
      </div>
    </header>
  );
}

export default Header;