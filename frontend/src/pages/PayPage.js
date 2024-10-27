import React, { useEffect, useState } from 'react';
import '../styles/components/PayPage.css'; 

const PayPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Cargar el carrito desde sessionStorage al cargar la página
  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    // Calcular el total
    const total = storedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  return (
    <div className="checkout-container">
      <h2>Resumen del Pedido</h2>
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <img src={item.image} alt={item.name} className="item-image" />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">${item.price} COP</p>
                  <p className="item-quantity">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <p className="item-total">Subtotal: ${item.price * item.quantity} COP</p>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
      
      <div className="checkout-summary">
        <h3>Total del Pedido</h3>
        <p>Total: ${totalPrice} COP</p>
        <p>Impuestos, descuentos y envío calculados en la pantalla de pago final.</p>
      </div>

      <button 
        onClick={() => alert('Pedido finalizado. ¡Gracias por su compra!')} 
        className="checkout-button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default PayPage;
