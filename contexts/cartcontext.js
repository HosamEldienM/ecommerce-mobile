import { useContext, useState } from "react";
import { auth, db } from "../config/config";
import React from "react";
import { LangContext } from "./langcontext";
import { UserContext } from "./usercontext";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { User } = useContext(UserContext);
  const [Cart, setCart] = useState([]);
  const { Lang } = useContext(LangContext);

  function getCart() {
    let Store = [];
    if (auth.currentUser)
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .collection("Cart")
        .get()
        .then((res) => {
          res.forEach((product) => {
            Store.push(product.data());
          });
          setCart(Store);
        });
  }
  function removeCart() {
    for (var product of Cart)
      db.collection("Users")
        .doc(User.ID)
        .collection("Cart")
        .doc(product.ID)
        .delete()
        .then(() => setCart([]));
  }

  //for adding to cart//
  function addToCart(product) {
    if (!auth.currentUser) {
      alert(
        Lang === "en"
          ? "please login or sign up first.."
          : "برجاء تسجيل الدخول أو إنشاء حساب أولاً.."
      );

      return;
    }
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .collection("Cart")
      .doc(product.ID)
      .set({ ...product, Quantity: 1 })
      .then(() => getCart());
    db.collection("products")
      .doc(product.ID)
      .update({ AddedToCart: product.AddedToCart + 1 });
  }

  //for removing items from cart
  function removeFromCart(id) {
    db.collection("Users")
      .doc(User.ID)
      .collection("Cart")
      .doc(id)
      .delete()
      .then(() => getCart());
  }

  //increasing product quantity
  function increment(product) {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .collection("Cart")
      .doc(product.ID)
      .update({ Quantity: product.Quantity + 1 })
      .then(() => getCart());
  }

  //for decreasing quantity of product in cart
  function decrement(product) {
    if (product.Quantity != 1) {
      db.collection("Users")
        .doc(User.ID)
        .collection("Cart")
        .doc(product.ID)
        .update({ Quantity: product.Quantity - 1 })
        .then(() => getCart());
    }
  }

  //check whether in cart
  function isInCart(id) {
    for (var y of Cart) if (id === y.ID) return true;
    return false;
  }

  //calculating totla price
  function totlaPrice() {
    var total = 0;
    for (var item of Cart) total = total + item.Price * item.Quantity;
    return total;
  }

  const value = {
    Cart,
    setCart,
    getCart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    isInCart,
    removeCart,
    totlaPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
