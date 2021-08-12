import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text, View, Image, ScrollView } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { db } from "../config/config";
import { useContext } from "react";
import { ProductsContext } from "../contexts/productscontext";
import style from "../assets/style";
import { LangContext } from "../contexts/langcontext";
import { CartContext } from "../contexts/cartcontext";

export default function postdata() {
  const params = useRoute();
  const { CurrentProduct, setCurrentProduct } = useContext(ProductsContext);
  const { Lang } = useContext(LangContext);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "lavender" }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: CurrentProduct.Image }}
        style={{
          width: "100%",
          height: 300,
          resizeMode: "stretch",
        }}
      />

      <View style={{ flex: 1 }}>
        <View
          style={{
            marginBottom: 8,
            padding: 10,
            shadowRadius: 8,
            shadowOpacity: 0.4,
            elevation: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#7239c9",
            }}
          >
            {Lang === "en" ? CurrentProduct.EnName : CurrentProduct.ArName}
          </Text>
          <Text
            style={{
              padding: 14,
              fontSize: 20,
              fontWeight: 700,
              color: "#7239c9",
            }}
          >
            {CurrentProduct.Price}
            <Text
              style={{
                padding: 5,
                fontSize: 14,
                fontWeight: 500,
                color: "black",
              }}
            >
              {Lang === "en" ? " EGP" : " جنيه"}
            </Text>
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            shadowRadius: 8,
            shadowOpacity: 0.4,
            elevation: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              padding: 12,
              fontSize: 16,
              fontWeight: 500,
              color: "black",
            }}
          >
            {Lang === "en"
              ? CurrentProduct.EnDescription
              : CurrentProduct.ArDescription}
          </Text>
          {!isInCart(CurrentProduct.ID) && (
            <TouchableOpacity
              style={productCardStyle.button}
              onPress={() => addToCart(CurrentProduct)}
            >
              <Text style={productCardStyle.buttonText}>
                {Lang === "en" ? "Add to cart" : "إضافة لعربة التسوق"}
              </Text>
            </TouchableOpacity>
          )}
          {isInCart(CurrentProduct.ID) && (
            <TouchableOpacity
              style={{ ...productCardStyle.button, backgroundColor: "#f7f2ff" }}
              onPress={() => removeFromCart(CurrentProduct.ID)}
            >
              <Text
                style={{ ...productCardStyle.buttonText, color: "#7239c9" }}
              >
                {Lang === "en" ? "Remove from cart" : "إزالة من عربة التسوق"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const productCardStyle = {
  button: {
    backgroundColor: "#7239c9",
    paddingVertical: 10,
    borderRadius: 3,

    width: "80%",
    margin: "auto",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
};
