// src/components/ProductList.js
import React from 'react';
import './ProductList.css';  // Estilos de la lista de productos

const products = [
  { name: "Fruticas", imgSrc: "ruta-a-imagen-1" },
  { name: "Choco Break", imgSrc: "ruta-a-imagen-2" },
  { name: "Jumbo", imgSrc: "ruta-a-imagen-3" },
  // Agrega más productos aquí
];

function ProductList() {
  return (
    <div className="product-list">
      <h3>Dulces</h3>
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.imgSrc} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
