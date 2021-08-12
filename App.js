import MyNavigator from "./components/index";
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/usercontext";
import { LangProvider } from "./contexts/langcontext";
import { CartProvider } from "./contexts/cartcontext";
import styles from "./assets/style";
import { View } from "react-native";
import { ProductsProvider } from "./contexts/productscontext";

export default function App() {
  return (
    <LangProvider>
      <UserProvider>
        <CartProvider>
          <ProductsProvider>
            <NavigationContainer>
              <MyNavigator />
            </NavigationContainer>
          </ProductsProvider>
        </CartProvider>
      </UserProvider>
    </LangProvider>
  );
}
