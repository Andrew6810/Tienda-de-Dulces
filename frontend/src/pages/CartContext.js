import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart
      ? JSON.parse(savedCart).filter(item => item.price && !item.name.toLowerCase().includes("oferta"))
      : [];
  });

  useEffect(() => {
    const validCartItems = cartItems.filter(item => item.price && !item.name.toLowerCase().includes("oferta"));
    sessionStorage.setItem("cartItems", JSON.stringify(validCartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, purchaseQuantity: i.purchaseQuantity + 1 }
            : i
        );
      } else {
        return [...prevItems, { ...item, purchaseQuantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, purchaseQuantity: (item.purchaseQuantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && (item.purchaseQuantity || 1) > 1
          ? { ...item, purchaseQuantity: item.purchaseQuantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
