import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useContext } from "react/cjs/react.development";
import { ProductsContext } from "../contexts/productscontext";
import { LangContext } from "../contexts/langcontext";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ categoryNumber, categoryName, image }) => {
  const { Lang } = useContext(LangContext);
  const { Products, setCategory } = useContext(ProductsContext);
  const navigation = useNavigation();
  const productsNumber = Products.filter((item) => {
    return item.Category === categoryNumber;
  });

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={require(`../assets/${image}`)} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{categoryName}</Text>
        <Text style={styles.count}>
          {productsNumber.length} {Lang === "en" ? "products" : "منتج"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => {
          setCategory(categoryNumber);
          navigation.navigate("Home", { screen: "Home" });
        }}
      >
        <Text style={styles.followButtonText}>
          {Lang === "en" ? "Shop now" : "تسوق الآن"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;
const styles = StyleSheet.create({
  card: {
    shadowRadius: 8,
    shadowOpacity: 0.4,
    elevation: 10,
    margin: 10,
    flex: 1,
    backgroundColor: "white",
    padding: 3,
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
  },
  image: {
    width: "36%",
    height: "100%",
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#ebf0f7",
    resizeMode: "stretch",
  },
  cardContent: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 18,
    color: "#7239c9",
    fontWeight: "bold",
  },
  count: {
    fontSize: 16,
    color: "#7239c9",
  },
  followButton: {
    height: 35,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#7239c9",
    width: "28%",
  },
  followButtonText: {
    color: "white",
    fontSize: 16,
  },
});
