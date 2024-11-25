import React, { useState, useEffect } from 'react';
import '../styles/components/ProductList.css';  // Estilos de la lista de productos
import kit1 from '../components/img/kit1.png'; 
import kit2 from '../components/img/kit2.png'; 
import kit3 from '../components/img/kit3.png';
import { useCart } from '../pages/CartContext';  // Cambia la ruta a 'pages/CartContext'

// Lista de kits
const kits = [
  { id: 1, name: "Kit 1", imgSrc: kit1, price: 25000 },
  { id: 2, name: "Kit 2", imgSrc: kit2, price: 40000 },
  { id: 3, name: "Kit 3", imgSrc: kit3, price: 35000 },
];


function EmojiButtons() {
  const emojiData = [
    { emoji: "🛒", label: "Carrito" },
    { emoji: "💳", label: "Medio de Pago" },
    { emoji: "🔒", label: "Compra Segura" },
    { emoji: "💰", label: "Precios Económicos" },
  ];

  return (
    <div className="emoji-container">
      {emojiData.map((item, index) => (
        <button key={index} className="emoji-btn">
          <span className="emoji">{item.emoji}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProductList() {
  const { addToCart } = useCart(); // Usamos el contexto para acceder a addToCart

  const handleAddToCart = (item) => {
    addToCart(item); // Envía el producto completo al carrito
    alert(`${item.name} ha sido agregado al carrito!`);
  };
  

  return (
    <div className="product-list">
      <h3>Kits</h3>
      <div className="product-cards">
        {kits.map((kit, index) => (
          <div className="product-card" key={index}>
            <img src={kit.imgSrc} alt={kit.name} />
            <p>{kit.name}</p>
            <p className="product-price">${kit.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(kit)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>

      <EmojiButtons />
    </div>
  );
}

export default ProductList;
