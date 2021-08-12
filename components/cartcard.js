import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, FlatList, Text, View, Image } from "react-native";
import { useContext } from "react";
import { LangContext } from "../contexts/langcontext";
import { CartContext } from "../contexts/cartcontext";
import { ProductsContext } from "../contexts/productscontext";

const CartCard = ({ product }) => {
  const { Lang } = useContext(LangContext);
  const { Cart, removeFromCart, increment, decrement } =
    useContext(CartContext);
  const { setCurrentProduct } = useContext(ProductsContext);
  const navigation = useNavigation();
  return (
    <View style={cartCardStyle.card}>
      <TouchableOpacity
        style={{ width: "30%" }}
        onPress={() => {
          setCurrentProduct(product);
          navigation.navigate("Data");
        }}
      >
        <Image source={{ uri: product.Image }} style={cartCardStyle.image} />
      </TouchableOpacity>
      <View style={cartCardStyle.data}>
        <Text
          style={cartCardStyle.name}
          onPress={() => {
            setCurrentProduct(product);
            navigation.navigate("Data");
          }}
        >
          {Lang === "en" ? product.EnName : product.ArName}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{Lang === "en" ? "Quantity: " : "الكمية: "}</Text>
          <TouchableOpacity onPress={() => decrement(product)}>
            <Text style={cartCardStyle.quantityButtons}>-</Text>
          </TouchableOpacity>
          <Text>{product.Quantity}</Text>
          <TouchableOpacity onPress={() => increment(product)}>
            <Text style={cartCardStyle.quantityButtons}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ paddingVertical: 5 }}>
          {product.Price * product.Quantity}
          {Lang === "en" ? " EGP" : " جنيه"}
        </Text>

        <TouchableOpacity
          style={{ ...cartCardStyle.button, backgroundColor: "#f7f2ff" }}
          onPress={() => removeFromCart(product.ID)}
        >
          <Text style={{ ...cartCardStyle.buttonText }}>
            {Lang === "en" ? "Remove from cart" : "إزالة من عربة التسوق"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const cartCardStyle = {
  card: {
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 3,
    shadowRadius: 8,
    shadowOpacity: 0.4,
    elevation: 10,
    height: 140,
  },
  image: { height: 140, resizeMode: "stretch", borderRadius: 3 },
  data: {
    width: "70%",
    flexDirection: "column",
    paddingHorizontal: 10,
    height: "100%",
  },
  button: {
    backgroundColor: "#7239c9",
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  buttonText: {
    color: "#948799",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  name: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  quantityButtons: {
    marginHorizontal: 10,
    paddingHorizontal: 7,
    fontSize: 22,
    fontWeight: "800",
  },
};
