import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import style from "../assets/style";
import { db } from "../config/config";
import { CartContext } from "../contexts/cartcontext";
import { LangContext } from "../contexts/langcontext";
import { UserContext } from "../contexts/usercontext";
import Paypal from "./paypal";

const Checkout = () => {
  const { Lang } = useContext(LangContext);
  const { Cart, totlaPrice, removeCart } = useContext(CartContext);
  const [Paid, setPaid] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState();
  const { User } = useContext(UserContext);
  const navigation = useNavigation();

  //adding an order
  function addOrder() {
    setLoading(true);
    const order = {
      products: Cart,
      timestamp: new Date().getTime(),
      status: "new",
      address: Address,
      price: totlaPrice(),
      phone: Phone,
      userEmail: User.Email,
      userName: User.Name,
      userID: User.ID,
    };
    db.collection("Users")
      .doc(User.ID)
      .collection("Orders")
      .add(order)
      .then((res) => {
        db.collection("Orders")
          .doc(res.id)
          .set(order)
          .then(() => {
            removeCart();
            setLoading(false);
            alert(
              Lang === "en"
                ? "Order added successfully"
                : "تم إضافة الطلب بنجاح"
            );

            navigation.navigate("Home");
          });
      });
    Cart.forEach((product) => {
      db.collection("products")
        .doc(product.ID)
        .update({ Purchses: product.Purchses + 1 });
    });
  }

  return (
    <View style={style.page}>
      <Text
        style={{
          padding: 10,
          fontSize: 18,
          fontWeight: 400,
        }}
      >
        {Lang === "en"
          ? "Please enter your address and phone number and complete your payment toplace your order"
          : "برجاء إدخال عنوانك ورقم تليفونك وإكمال عملية الدفع لإتمام طلبك"}
      </Text>
      <Text style={style.label}>{Lang === "en" ? "Address" : "العنوان"}</Text>
      <TextInput
        placeholderColor="#c4c3cb"
        value={Address}
        onChangeText={(e) => {
          setAddress(e);
        }}
        style={style.loginFormTextInput}
      />
      <Text style={style.label}>
        {Lang === "en" ? "Phone no." : "رقم الهاتف"}
      </Text>
      <TextInput
        placeholderColor="#c4c3cb"
        value={Phone}
        onChangeText={(e) => {
          setPhone(e);
        }}
        style={style.loginFormTextInput}
      />

      <Paypal totlaPrice={totlaPrice} Paid={Paid} setPaid={setPaid} />
      <TouchableOpacity
        style={style.button}
        disabled={!Paid || Loading || !Address || !Phone}
        onPress={() => addOrder()}
      >
        <Text style={style.buttonText}>
          {Lang === "en" ? "Place order" : "إضافة الطلب"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
