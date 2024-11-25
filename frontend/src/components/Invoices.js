import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/components/Invoices.css";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    API.getInvoices().then((data) => setInvoices(data));
  }, []);

  return (
    <div className="reports-page">
      <h2>Reportes</h2>

      {/* Botón de cierre de sesión */}
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>

      <section>
        <h3>Facturas</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Dirección de Entrega</th>
              <th>Fecha</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.id}</td>
                <td>{invoice.customer.first_name}</td>
                <td>{invoice.customer.mail}</td>
                <td>{invoice.customer.address}</td>
                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                <td>${invoice.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Invoices;
