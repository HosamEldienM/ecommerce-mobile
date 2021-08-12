import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { auth } from "../config/config";
import { useState } from "react";
import { LangContext } from "../contexts/langcontext";
import styles from "../assets/style";
export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigation = useNavigation();

  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const { Lang } = useContext(LangContext);

  async function login() {
    let check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email);
    if (!Email || !check)
      setEmailError(
        Lang === "en"
          ? "Please enter a valid email"
          : "برجاء إدخال بريد إلكتروني صالح"
      );
    if (Password.length < 8)
      setPasswordError(
        Lang === "en"
          ? "password length should be 8 or more"
          : "كلمة السر يجب أن تتكون من ثمانية أحرف على الأقل"
      );
    if (!check || !Email || Password.length < 8) return;
    await auth
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        err.message.length == 89
          ? setEmailError(
              Lang === "en"
                ? "email not registered"
                : "البريد الإلكتروني غير مسجل"
            )
          : setPasswordError(
              Lang === "en" ? "incorrect password" : "كلمة السر خاطئة"
            );
      });
  }

  return (
    <View style={styles.page}>
      <Text style={styles.logoText}>
        {Lang === "en" ? "LOGIN" : "تسجيل الدخول"}
      </Text>

      <Text style={styles.label}>
        {Lang === "en" ? "Email" : "البريد الإلكتروني"}
      </Text>
      <TextInput
        placeholder={Lang === "en" ? "Your Email" : "ادخل بريدك الإلكتروني"}
        placeholderColor="#c4c3cb"
        onChangeText={(e) => {
          setEmail(e);
          setEmailError("");
        }}
        value={Email}
        style={styles.loginFormTextInput}
      />
      <Text style={styles.errorText}>{EmailError}</Text>
      <Text style={styles.label}>
        {Lang === "en" ? "Password" : "كلمة السر"}
      </Text>
      <TextInput
        placeholder={Lang === "en" ? "Your Password" : "ادخل كلمة السر"}
        placeholderColor="#c4c3cb"
        style={{ ...styles.loginFormTextInput }}
        secureTextEntry={true}
        onChangeText={(e) => {
          setPassword(e);
          setPasswordError("");
        }}
        value={Password}
      />
      <Text style={styles.errorText}>{PasswordError}</Text>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>
          {" "}
          {Lang === "en" ? "Login" : "دخول"}
        </Text>
      </TouchableOpacity>

      <Text>
        {Lang === "en" ? "Not a member?" : "لست عضواً؟"}{" "}
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate("Signup")}
        >
          {Lang === "en" ? "Sign Up" : "أنشئ حساباً"}
        </Text>
      </Text>
    </View>
  );
}
