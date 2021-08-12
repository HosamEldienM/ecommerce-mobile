import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import homepage from "./homepage";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Homestack from "./homestack";

import CartPage from "./cartpage";
import Categories from "./categories";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { LangContext } from "../contexts/langcontext";
import CartStack from "./cartstack";
import TabBar from "./tabbar";
import ProfileStack from "./profilestack";

const { Navigator, Screen } = createBottomTabNavigator();

export default function MyNavigator() {
  const { Cart } = useContext(CartContext);
  const { Lang } = useContext(LangContext);
  return (
    <Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: { backgroundColor: "#7239c9" },
        activeTintColor: "orange",
        inactiveTintColor: "white",
      }}
    >
      <Screen
        name="Home"
        component={Homestack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={28} />
          ),
          title: Lang === "en" ? "Home" : "الرئيسية",
        }}
      />
      <Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" color={color} size={28} />
          ),
          title: Lang === "en" ? "Categories" : "الفئات",
          headerShown: false,
        }}
      />
      <Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={28} />
          ),
          title: Lang === "en" ? "Profile" : "حسابي",
        }}
      />
      <Screen
        name="Cart"
        component={CartStack}
        options={{
          title: Lang === "en" ? "Cart" : "عربة التسوق",
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="shopping-cart" color={color} size={28} />

              {Cart.length !== 0 && (
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: 4,
                    borderRadius: 10,
                  }}
                >
                  {Cart.length}
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Navigator>
  );
}
