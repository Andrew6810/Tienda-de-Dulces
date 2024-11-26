import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/components/BuyPage.css";

const BuyPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = sessionStorage.getItem("products");
        setProducts(JSON.parse(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const handleAddToCart = (item) => {
    alert(`${item.name} ha sido agregado al carrito!`);
  
    // Obtener el carrito actual desde sessionStorage o inicializarlo si está vacío
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  
    // Buscar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
  
    if (existingItemIndex >= 0) {
      // Si el producto ya está en el carrito, incrementa su cantidad de compra
      cartItems[existingItemIndex].purchaseQuantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad de compra inicial de 1 y stock especificado
      cartItems.push({ ...item, stock: item.quantity, purchaseQuantity: 1 });
    }
  
    // Guardar el carrito actualizado en sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    console.log(`${item.name} ha sido agregado al carrito!`);
  };

  return (
    <div className="category-page">
      {categories.map((category) => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-container">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <article key={product.id} className="product-card">
                  <img src={product.imgSrc} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default BuyPage;
