import React, { useState, useEffect } from "react";
import "../styles/components/CartPage.css";

function CartPage() {
  // Recupera los datos del carrito de localStorage si existen
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [
    { id: 1, name: "Chocolate", quantity: 2, price: 5.99 },
    { id: 2, name: "Gomitas de Fruta", quantity: 1, price: 3.49 },
    { id: 3, name: "Caramelo de Menta", quantity: 4, price: 2.99 },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Guardar en localStorage cada vez que cambia el estado del carrito
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </span>
            <span className="item-price">Precio: ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${total}</h2>
      </div>
      <button className="checkout-button">Finalizar Compra</button>
    </div>
  );
}

export default CartPage;
