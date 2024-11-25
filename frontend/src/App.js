import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CartPage from "./pages/CartPage";
import PayPage from "./pages/PayPage";
import ShippingForm from "./pages/ShippingForm";
import { CartProvider } from "./pages/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PayPage />} />
          <Route path="/form" element={<ShippingForm />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
