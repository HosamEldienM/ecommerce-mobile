import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import style from "../assets/style";
import { useContext } from "react/cjs/react.development";
import { LangContext } from "../contexts/langcontext";

import { ProductsContext } from "../contexts/productscontext";
import { useNavigation } from "@react-navigation/native";

const TabBar = ({ nosearch }) => {
  const { Lang } = useContext(LangContext);
  const { SearchText, setSearchText } = useContext(ProductsContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 70,
        backgroundColor: "#7239c9",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: 60, resizeMode: "stretch" }}
          source={require("../assets/aswana.jpg")}
        />
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        {!nosearch && (
          <>
            <TextInput
              style={{
                height: 40,
                fontSize: 14,
                borderRadius: 5,
                borderColor: "#eaeaea",
                outline: "none",
                backgroundColor: "white",
                paddingLeft: 10,
                borderWidth: 0,
                width: "90%",
                textAlign: "left",
              }}
              placeholder={
                Lang === "en" ? "search products" : "البحث في المنتجات"
              }
              placeholderColor="#c4c3cb"
              onChangeText={(e) => {
                setSearchText(e);
              }}
              value={SearchText}
            />
            <Text style={{ marginLeft: 10 }}>
              <FontAwesome name="search" color="white" size={28} />
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default TabBar;
