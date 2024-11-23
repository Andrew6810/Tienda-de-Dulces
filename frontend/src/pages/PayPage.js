import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importa jsPDF
import '../styles/components/PayPage.css'; 
import API from '../services/api.js';

const PayPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const updatedCartItems = JSON.parse(sessionStorage.getItem('updatedCartItems')) || [];
  const customer = JSON.parse(sessionStorage.getItem('shippingInfo')) || [];

  // Cargar el carrito desde sessionStorage al cargar la página
  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    // Calcular el total
    const total = storedCartItems.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0);
    setTotalPrice(total);
  }, []);

  const handleCheckout = () => {
    // Enviar la información al backend
    updatedCartItems.forEach((item) => {
      item ={
          id: item.id,
          description: item.description,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
      }
      API.updateProduct(item).then(() => {
          console.log('Stock actualizado');
      });
  });

    // Agregar nuevo comprador
    API.saveCustomerInfo(customer).then(() => {
      console.log('Nuevo cliente agregado');
    });

    const invoice = {
      address: customer.address,
      date: customer.date,
      total: totalPrice,
      id_customer: customer.id,
    };
    API.createInvoice(invoice).then(() => {
      console.log('Factura creada');
    });
    // Limpiar el carrito
    sessionStorage.setItem('cartItems', JSON.stringify([]));
    navigate('/');
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(18);
    doc.text("Factura de Compra - Candy Shop", 10, 10);

    // Detalles del pedido
    doc.setFontSize(12);
    doc.text("Resumen del Pedido:", 10, 20);
    cartItems.forEach((item, index) => {
      const y = 30 + index * 10; // Espaciado entre filas
      doc.text(`${item.name} - Cantidad: ${item.purchaseQuantity} - Precio Unitario: $${item.price} COP`, 10, y);
      doc.text(`Subtotal: $${item.price * item.purchaseQuantity} COP`, 10, y + 5);
    });

    // Total
    doc.text(`Total del Pedido: $${totalPrice} COP`, 10, 30 + cartItems.length * 10 + 10);

    // Pie de página
    doc.text("Gracias por tu compra en Candy Shop!", 10, 30 + cartItems.length * 10 + 20);

    // Descargar PDF
    doc.save("factura_candy_shop.pdf");
  };

  return (
    <div className="checkout-container">
      <h2>Resumen del Pedido</h2>
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <img src={item.imgSrc} alt={item.name} className="item-image" />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">${item.price} COP</p>
                  <p className="item-quantity">Cantidad: {item.purchaseQuantity}</p>
                </div>
              </div>
              <p className="item-total">Subtotal: ${item.price * item.purchaseQuantity} COP</p>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
      
      <div className="checkout-summary">
        <h3>Total del Pedido:  ${totalPrice} COP</h3>
      </div>
      <div className='cart-summary'>
        <h2>Información del Cliente</h2>
        <p><strong>Nombre:</strong> {customer.first_name} {customer.last_name}</p>
        <p><strong>Dirección:</strong> {customer.address}</p>
        <p><strong>Fecha de Pedido:</strong> {customer.date}</p>
      </div>


      <button 
        onClick={handleCheckout} 
        className="checkout-button"
      >
        Confirmar Pedido
      </button>
      <button 
        onClick={downloadInvoice} 
        className="download-button"
      >
        Descargar Factura
      </button>
    </div>
  );
};

export default PayPage;

