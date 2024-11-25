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
                  <button>Add to cart</button>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default BuyPage;
