// src/components/ProductList.js
import React, { useState } from 'react';
import '../styles/components/ProductList.css';  // Estilos de la lista de productos
import fruticas from '../components/img/fruticas.png';
import choco from '../components/img/choco.png';
import jumbo from '../components/img/jumbo.png';
import chocomelos from '../components/img/chocomelos.png';
import troli from '../components/img/troli.png';
import max from '../components/img/max.png';
import Surti from '../components/img/surti.png'; 
import manut from '../components/img/manut.png'; 
import trulu from '../components/img/trulu.png'; 
import kit1 from '../components/img/kit1.png'; 
import kit2 from '../components/img/kit2.png'; 
import kit3 from '../components/img/kit3.png';


const products = [
  { name: "Fruticas", imgSrc: fruticas, price: "10000" ,stock: 10},
  { name: "Choco Break", imgSrc: choco, price: "15.000" },
  { name: "Jumbo", imgSrc: jumbo, price: "3.000" },
  { name: "Choco", imgSrc: chocomelos, price: "2.000" },
  { name: "Trolli", imgSrc: troli, price: "2.500" },
  { name: "Max", imgSrc: max, price: "13.000" },
  { name: "Surti", imgSrc: Surti, price: "10.000" },
  { name: "Manut", imgSrc: manut, price: "13.000" },
  { name: "Trulu", imgSrc: trulu, price: "70.000" },
];
// Lista de kits
const kits = [
  { name: "Kit 1", imgSrc: kit1, price: "25.000" },
  { name: "Kit 2", imgSrc: kit2, price: "40.000" },
  { name: "Kit 3", imgSrc: kit3, price: "35.000" },
];

// Componente EmojiButtons para mostrar los botones de emojis
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

// Componente para mostrar productos y kits
function ProductList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsToShow = 6;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - productsToShow : prevIndex - productsToShow
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - productsToShow ? 0 : prevIndex + productsToShow
    );
  };

  const handleAddToCart = (item) => {
    // Mostrar alerta en pantalla
    alert(`${item.name} ha sido agregado al carrito!`);
  
    // Obtener el carrito actual desde sessionStorage o inicializarlo si está vacío
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  
    // Buscar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
    if (existingItemIndex >= 0) {
      // Si el producto ya está en el carrito, incrementa su cantidad
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad inicial de 1
      cartItems.push({ ...item, quantity: 1 });
    }
  
    // Guardar el carrito actualizado en sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    console.log(`${item.name} ha sido agregado al carrito!`);
  };
  

  return (
    <div className="product-list">
      <h3>Dulces</h3>
      <div className="product-cards">
        {products.slice(currentIndex, currentIndex + productsToShow).map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.imgSrc} alt={product.name} />
            <p>{product.name}</p>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Añadir al carrito
            </button>
          </div>
        ))}

      </div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={handlePrev}>
          &#10094; {/* Flecha izquierda */}
        </button>
        <button className="nav-button" onClick={handleNext}>
          &#10095; {/* Flecha derecha */}
        </button>
      </div>

 {/* Botones Emoji */}
 <EmojiButtons />

{/* Sección de Kits */}
<h3>Kits</h3>
      <div className="product-cards">
        {kits.map((kit, index) => (
          <div className="product-card" key={index}>
            <img src={kit.imgSrc} alt={kit.name} />
            <p>{kit.name}</p>
            <p className="product-price">{kit.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(kit)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
