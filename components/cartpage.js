import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react/cjs/react.development";
import { auth } from "../config/config";
import { CartContext } from "../contexts/cartcontext";
import CartCard from "./cartcard";
import styles from "../assets/style";
import { LangContext } from "../contexts/langcontext";
import style from "../assets/style";
import { useNavigation } from "@react-navigation/native";
import TabBar from "./tabbar";

const CartPage = () => {
  const { Cart, getCart, totlaPrice } = useContext(CartContext);

  const { Lang } = useContext(LangContext);
  const navigation = useNavigation();

  useEffect(() => {
    getCart();
  }, [auth.currentUser]);
  return (
    <View style={style.page}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontSize: 30,
              marginTop: "50%",
              fontWeight: "600",
              textAlign: "center",
              color: "#7239c9",
            }}
          >
            {Lang === "en" ? "Your cart is empty" : "عربة التسوق فارغة"}
          </Text>
        )}
        style={{ width: "100%" }}
        data={Cart}
        renderItem={({ item }) => (
          <CartCard product={item} lang={Lang} fromcart={true} />
        )}
      />
      {totlaPrice() > 0 && (
        <View
          style={{
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#F7F0F9",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#7239c9",
              textAlign: "center",
              padding: 5,
            }}
          >
            {Lang === "en" ? "Totla Price: " : "الإجمالي:  "}
            {totlaPrice()}
            {Lang == "en" ? " EGP" : "  جنيه"}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            style={{
              backgroundColor: "orange",
              paddingVertical: 10,
              borderRadius: 5,
              height: 45,
            }}
          >
            <Text style={style.buttonText}>
              {Lang === "en" ? "PROCEED TO CHECKOUT" : "الانتقال للدفع"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartPage;
