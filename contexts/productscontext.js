import { useContext, useState } from "react";
import { auth, db } from "../config/config";
import React from "react";

export const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [Products, setProducts] = React.useState([]);
  const [Category, setCategory] = React.useState(null);
  const [SearchText, setSearchText] = useState("");
  const [CurrentProduct, setCurrentProduct] = React.useState({});
  function getProducts() {
    let Store = [];
    db.collection("products")
      .get()
      .then((res) => {
        res.forEach((product) => {
          Store.push({ ...product.data(), ID: product.id });
        });
        setProducts(Store);
      });
  }

  const value = {
    Products,
    getProducts,
    SearchText,
    setSearchText,
    setProducts,
    CurrentProduct,
    setCurrentProduct,
    Category,
    setCategory,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
