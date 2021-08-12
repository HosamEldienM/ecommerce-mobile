import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CartPage from "./cartpage";
import Checkout from "./checkout";
import { useContext } from "react/cjs/react.development";
import { LangContext } from "../contexts/langcontext";
import { CartContext } from "../contexts/cartcontext";

const { Navigator, Screen } = createStackNavigator();

export default function CartStack() {
  const { Lang } = useContext(LangContext);
  const { Cart } = useContext(CartContext);
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#7239c9" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
      <Screen
        name="Cart"
        component={CartPage}
        options={{
          title: Lang === "en" ? "Cart" : "عربة التسوق",
        }}
      />

      {Cart.length !== 0 && (
        <Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: Lang === "en" ? "CHECKOUT" : "إتمام الطلب",
          }}
        />
      )}
    </Navigator>
  );
}
