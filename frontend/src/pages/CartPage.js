import React, { useState, useEffect } from "react";
import "../styles/components/CartPage.css";

function CartPage() {
  const initialCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [
    {
      id: 1,
      name: "Choc Melos",
      category: "Dulce",
      quantity: 1,
      price: 3000,
      stock: 10,
      imageUrl: "/images/chocmelos.jpg",
    },
    {
      id: 2,
      name: "Trolli Mordiscos",
      category: "Dulce",
      quantity: 1,
      price: 2500,
      stock: 5,
      imageUrl: "/images/trolli.jpg",
    },
    {
      id: 3,
      name: "Max Combi",
      category: "Dulce",
      quantity: 1,
      price: 2500,
      stock: 8,
      imageUrl: "../img/troli.png",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toLocaleString("es-CO");

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h2>PRODUCTO</h2>
        <h2>CANTIDAD</h2>
        <h2>TOTAL</h2>
      </header>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="product-info">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div>
                <p className="category">{item.category}</p>
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price.toLocaleString("es-CO")}</p>
                <p className="item-stock">Stock disponible: {item.stock - item.quantity}</p>
              </div>
            </div>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)} className="remove-button">🗑️</button>
            </div>

            <p className="total-price">${(item.price * item.quantity).toLocaleString("es-CO")}</p>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total estimado <strong>${total} COP</strong></p>
        <p>Impuestos, descuentos y envío calculados en la pantalla de pago</p>
        <button className="checkout-button">Pagar pedido</button>
      </div>
    </div>
  );
}

export default CartPage;
