import React from "react";

function Cart() {
  const cartItems = [
    { id: 1, name: 'Chocolates', quantity: 2 },
    { id: 2, name: 'Gomitas', quantity: 5 },
  ];

  return (
    <div className="cart">
      <h2>Contenido del Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;