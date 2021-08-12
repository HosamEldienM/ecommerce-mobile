import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import homepage from "./homepage";
import postdata from "./productdetails";
import { useContext } from "react";
import { ProductsContext } from "../contexts/productscontext";
import { LangContext } from "../contexts/langcontext";
const { Navigator, Screen } = createStackNavigator();

export default function Homestack() {
  const { CurrentProduct } = useContext(ProductsContext);
  const { Lang } = useContext(LangContext);
  return (
    <Navigator
      initialRouteName="Home"
      options={{ initialRouteName: "homepage" }}
      screenOptions={{
        headerStyle: { backgroundColor: "#7239c9" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
      <Screen
        name="Home"
        component={homepage}
        options={{ headerShown: false }}
      />
      <Screen
        name="Data"
        options={{
          title: Lang === "en" ? CurrentProduct.EnName : CurrentProduct.ArName,
        }}
        component={postdata}
      />
    </Navigator>
  );
}
