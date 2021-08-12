import React from "react";
import { useState, useEffect, useContext } from "react";
import TabBar from "./tabbar";
import { ProductsContext } from "../contexts/productscontext";
import CategoryItem from "./categoryitem";
import { LangContext } from "../contexts/langcontext";

export default function Categories() {
  const { Lang } = useContext(LangContext);

  const { Products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <TabBar nosearch={true} />
      <CategoryItem
        categoryNumber="category1"
        categoryName={Lang === "en" ? "Accessories" : "إكسسوارات"}
        image="acc2.webp"
      />
      <CategoryItem
        categoryNumber="category2"
        categoryName={Lang === "en" ? "CLothes" : "ملابس"}
        image="clothing.jpg"
      />
      <CategoryItem
        categoryNumber="category3"
        categoryName={Lang === "en" ? "Home & Living" : "المنزل والمعيشة"}
        image="living.jpg"
      />
    </>
  );
}
