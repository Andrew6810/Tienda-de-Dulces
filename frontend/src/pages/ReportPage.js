import React, { useState, useEffect } from "react";
import "../styles/components/ReportPage.css"; // Añade tus estilos
import API from '../services/api';

function ReportPage() {
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getInvoices().then((data) => setInvoices(data));
    API.getProducts().then((data) => setProducts(data));
  }, []);

  console.log(invoices);

  return (
    <div className="reports-page">
      <h2>Reportes</h2>
      <section>
        <h3>Facturas</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.id}</td>
                <td>{invoice.customer.first_name}</td>
                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                <td>${invoice.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Gestión de Productos</h3>
        <ProductManager products={products} setProducts={setProducts} />
      </section>
    </div>
  );
}

function ProductManager({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });

  const handleAddProduct = () => {
    const updatedProducts = [...products, { ...newProduct, id: products.length + 1 }];
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "", quantity: "" });
  };

  const handleEditProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], name: "Producto editado" };
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h4>Productos</h4>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEditProduct(index)}>Editar</button>
                <button onClick={() => handleDeleteProduct(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-product">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button onClick={handleAddProduct}>Agregar Producto</button>
      </div>
    </div>
  );
}

export default ReportPage;
