'use client';

import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

interface StateContextType {
  showCart: boolean;
  setshowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  Qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: { quantity: any; name: any; price: any; _id: any; }, quantity: any) => void;
  toggleCartItemQuantity: (id: any, value: any) => void;
  removeCartItem: (id: any) => void;
}

const context = createContext<StateContextType | undefined>(undefined);

export const StateContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState<any[]>([]);
  const [totalPrice, settotalPrice] = useState<number>(0);
  const [totalQuantities, settotalQuantities] = useState<number>(0);
  const [Qty, setQty] = useState<number>(1);

  let foundProduct: any;

  const onAdd = (product: { quantity: any; name: any; price: any; _id: any; }, quantity: any) => {
    const checkProductInCart = cartItems.find((item: { _id: any; }) => item._id === product._id);
    settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    settotalQuantities((prevTotalQuantites) => prevTotalQuantites + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: { _id: any; quantity: any; }) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          };
        }
        return cartProduct;
      });
      setcartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setcartItems([...cartItems, { ...product }]);
    }
    toast.success(`${Qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: any, value: any) => {
    foundProduct = cartItems.find((item) => item._id === id);

    if (value === 'inc') {
      setcartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      settotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setcartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const removeCartItem = (id: any) => {
  const updatedCartItems = cartItems.filter((item) => item._id !== id);
  const removedItem = cartItems.find((item) => item._id === id);

  if (removedItem) {
    setcartItems(updatedCartItems);
    settotalPrice((prevTotalPrice) => prevTotalPrice - removedItem.price * removedItem.quantity);
    settotalQuantities((prevTotalQuantities) => prevTotalQuantities - removedItem.quantity);
  } else {
    console.error(`Item with id ${id} not found in cart.`);
  }
};


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const value: StateContextType = {
    showCart,
    setshowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    Qty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    removeCartItem,
  };

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useStateContext must be used within a StateContext Provider");
  }
  return contextValue;
};
