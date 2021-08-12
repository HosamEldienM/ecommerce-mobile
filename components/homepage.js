import {
  useIsFocused,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Picker,
} from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { auth, db } from "../config/config";
import ProductCard from "./productcard";
import { useContext } from "react";
import { UserContext } from "../contexts/usercontext";
import { LangContext } from "../contexts/langcontext";
import { CartContext } from "../contexts/cartcontext";
import styles from "../assets/style";
import TabBar from "./tabbar";
import { ProductsContext } from "../contexts/productscontext";
import { useMemo } from "react";
import { useState } from "react";

export default function homepage() {
  const isFocused = useIsFocused();

  const { Lang } = useContext(LangContext);
  const navigation = useNavigation();

  const { User } = useContext(UserContext);
  const { Cart, getCart } = useContext(CartContext);
  const {
    Products,
    getProducts,
    SearchText,
    setSearchText,
    Category,
    setCategory,
  } = useContext(ProductsContext);

  var params = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCategory(null);
      setSearchText("");
      setGenderFilter("both");
      setSort("newest");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getCart();
  }, [auth.currentUser]);

  const [GenderFilter, setGenderFilter] = useState("both");
  const [Sort, setSort] = useState("newest");

  ///////category filter///////////
  const FilteredByCategory = useMemo(() => {
    if (Category)
      return Products.filter((product) => product.Category === Category);
    else return Products;
  }, [Category, Products, GenderFilter, Sort, SearchText]);

  ///////Gender filter///////////
  const FilteredByGender = useMemo(() => {
    if (GenderFilter === "both") return FilteredByCategory;
    if (GenderFilter === "men")
      return FilteredByCategory.filter(
        (product) => product.Gender === "male" || product.Gender === "unisex"
      );
    if (GenderFilter === "women")
      return FilteredByCategory.filter(
        (product) => product.Gender === "female" || product.Gender === "unisex"
      );
  }, [Category, Products, GenderFilter, Sort, SearchText]);
  ///////sorting///////////
  const SortedList = useMemo(() => {
    switch (Sort) {
      case "lowest price":
        return FilteredByGender.sort((a, b) => a.Price - b.Price);
      case "highest price":
        return FilteredByGender.sort((a, b) => b.Price - a.Price);
      case "newest":
        return FilteredByGender.sort((a, b) => b.timestamp - a.timestamp);
      case "most purchased":
        return FilteredByGender.sort((a, b) => b.Purchses - a.Purchses);
    }
  }, [Category, Products, GenderFilter, Sort, SearchText]);

  ////////////Search///////////////
  const SearchResult = useMemo(() => {
    if (SearchText)
      return SortedList.filter(
        (product) =>
          product.EnName.toLowerCase().includes(SearchText.toLowerCase()) ||
          product.ArName.includes(SearchText)
      );
    else return SortedList;
  }, [Category, Products, GenderFilter, Sort, SearchText]);

  return (
    <View style={styles.page}>
      <TabBar />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ ...styles.pickerText, marginLeft: 0 }}>
          {Lang === "en" ? "Group" : "النوع"}
        </Text>
        <Picker
          value={GenderFilter}
          style={styles.picker}
          onValueChange={(x) => setGenderFilter(x)}
        >
          <Picker.Item label={Lang === "en" ? "men" : "رجالي"} value="men" />
          <Picker.Item
            label={Lang === "en" ? "women" : "حريمي"}
            value="women"
          />
          <Picker.Item label={Lang === "en" ? "all" : "الكل"} value="both" />
        </Picker>
        {/* sort */}
        <Text style={styles.pickerText}>
          {" "}
          {Lang === "en" ? "Sort by" : "الترتيب حسب"}
        </Text>
        <Picker
          value={Sort}
          style={styles.picker}
          onValueChange={(x) => setSort(x)}
        >
          <Picker.Item
            label={Lang === "en" ? "newest" : "الأحدث"}
            value="newest"
          />
          <Picker.Item
            label={Lang === "en" ? "lowest price" : "الأقل سعراً"}
            value="lowest price"
          />
          <Picker.Item
            label={Lang === "en" ? "highest price" : "الأكثر سعراً"}
            value="highest price"
          />
          <Picker.Item
            label={Lang === "en" ? "most purchased" : "الأكثر شراءً"}
            value="most purchased"
          />
        </Picker>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        numColumns={2}
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
            {Lang === "en" ? "No products found" : "لا توجد منتجات"}
          </Text>
        )}
        data={SearchResult}
        renderItem={({ item }) => <ProductCard product={item} lang={Lang} />}
      />
    </View>
  );
}
