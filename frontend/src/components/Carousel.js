// src/components/Carousel.js
import React from 'react';
import './Carousel.css';  // Estilos del carrusel
import fondoDulce from './img/Fondo Dulce.png';

function Carousel() {
  return (
    <div className="carousel">
      <img src={fondoDulce} alt="Dulces" className="carousel-image" />
      <div className="carousel-text">
        <h2>DULCERIA</h2>
        <p>La magia de la alegría</p>
      </div>
    </div>
  );
}

export default Carousel;
