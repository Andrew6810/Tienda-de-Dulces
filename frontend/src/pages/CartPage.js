import React from "react";
import "../styles/components/CartPage.css"; // Asegúrate de tener un archivo CSS para los estilos

function CartPage() {
  // Datos de prueba para los productos en el carrito
  const cartItems = [
    { id: 1, name: "Chocolate", quantity: 2, price: 5.99 },
    { id: 2, name: "Gomitas de Fruta", quantity: 1, price: 3.49 },
    { id: 3, name: "Caramelo de Menta", quantity: 4, price: 2.99 },
  ];

  // Calcular el total del carrito
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      
      {/* Lista de productos */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">Cantidad: {item.quantity}</span>
            <span className="item-price">Precio: ${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="cart-total">
        <h2>Total: ${total}</h2>
      </div>

      {/* Botón para finalizar la compra */}
      <button className="checkout-button">Finalizar Compra</button>
    </div>
  );
}

export default CartPage;
