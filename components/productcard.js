import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, FlatList, Text, View, Image } from "react-native";
import { useContext } from "react";
import { LangContext } from "../contexts/langcontext";
import { CartContext } from "../contexts/cartcontext";
import { ProductsContext } from "../contexts/productscontext";

const ProductCard = ({ product }) => {
  const { Lang } = useContext(LangContext);
  const { Cart, addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const { setCurrentProduct } = useContext(ProductsContext);
  const navigation = useNavigation();
  return (
    <View style={productCardStyle.card}>
      <TouchableOpacity
        onPress={() => {
          setCurrentProduct(product);
          navigation.navigate("Data");
        }}
        style={{ width: "100%", height: "88%", alignItems: "center" }}
      >
        <Image source={{ uri: product.Image }} style={productCardStyle.image} />
        <Text style={productCardStyle.name}>
          {Lang === "en" ? product.EnName : product.ArName}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
          }}
        >
          {product.Price}
          {Lang === "en" ? " EGP" : " جنيه"}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
          }}
        >
          {Lang === "en" ? "Number of orders: " : "عدد مرات الشراء: "}{" "}
          {product.Purchses}
        </Text>
      </TouchableOpacity>
      {!isInCart(product.ID) && (
        <TouchableOpacity
          style={productCardStyle.button}
          onPress={() => addToCart(product)}
        >
          <Text style={productCardStyle.buttonText}>
            {Lang === "en" ? "Add to cart" : "إضافة لعربة التسوق"}
          </Text>
        </TouchableOpacity>
      )}
      {isInCart(product.ID) && (
        <TouchableOpacity
          style={{ ...productCardStyle.button, backgroundColor: "#f7f2ff" }}
          onPress={() => removeFromCart(product.ID)}
        >
          <Text style={{ ...productCardStyle.buttonText, color: "#7239c9" }}>
            {Lang === "en" ? "Remove from cart" : "إزالة من عربة التسوق"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;

const productCardStyle = {
  card: {
    width: "48%",
    height: 360,
    margin: 4,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 3,
    shadowRadius: 8,
    shadowOpacity: 0.4,
    elevation: 10,
  },
  image: { width: "100%", height: 200, resizeMode: "stretch", borderRadius: 3 },
  button: {
    backgroundColor: "#7239c9",
    paddingVertical: 10,
    borderRadius: 3,
    height: "12%",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  name: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    height: "16%",
  },
};
