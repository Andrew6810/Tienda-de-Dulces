import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/CartPage.css";
import { useCart } from "../pages/CartContext"; // Importa el contexto del carrito

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cartItems
    .reduce((acc, item) => acc + (item.price || 0) * (item.purchaseQuantity || 1), 0)
    .toLocaleString("es-CO");

  const gotoForm = () => {
    if (cartItems.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }
    navigate("/form");
  };

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
              <img src={item.imgSrc} alt={item.name} className="item-image" />
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price.toLocaleString("es-CO")}</p>
              </div>
            </div>
            

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.purchaseQuantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => removeItem(item.id)} className="remove-button">🗑️</button>
            </div>

            <p className="total-price">
              ${(item.price * item.purchaseQuantity).toLocaleString("es-CO")}
            </p>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total estimado <strong>${total} COP</strong></p>
        <p>Impuestos, descuentos y envío calculados en la pantalla de pago</p>
        <button className="checkout-button" onClick={gotoForm}>Rellenar datos de Envio</button>
      </div>
    </div>
  );
}

export default CartPage;
