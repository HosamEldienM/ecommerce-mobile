import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { auth, db } from "../config/config";
import { useState } from "react";
import { LangContext } from "../contexts/langcontext";
import styles from "../assets/style";
export default function Signup() {
  const navigation = useNavigation();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const { Lang } = useContext(LangContext);

  function signUp() {
    if (Name.length < 3)
      setNameError(
        Lang === "en"
          ? "Name must be three letters or more"
          : "الاسم يجب أن يتكون من ثلاثة أحرف على الأقل"
      );
    // let check = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email);
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
    if (Password.length >= 8 && Password !== RePassword) {
      setPasswordError(
        Lang === "en" ? "Passwords don't match" : "كلمتا السر لا تطابقان"
      );
    }

    if (
      !check ||
      !Email ||
      !Name ||
      Password.length < 8 ||
      Name.length < 3 ||
      Password !== RePassword
    )
      return;

    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((cred) => {
        db.collection("Users")
          .doc(cred.user.uid)
          .set({
            Name: Name,
            Email: Email,
            CreatedAt: new Date().getTime(),
          })
          .then(() => {
            navigation.navigate("Profile");
          });
      })
      .catch((err) =>
        setEmailError(
          Lang === "en" ? err.message : "صيغة البريد الإكتروني غير صالحة"
        )
      );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.logoText}>
        {Lang === "en" ? "SIGN UP" : "إنشاء حساب جديد"}
      </Text>
      <Text style={styles.label}>{Lang === "en" ? "Name" : "الاسم"}</Text>
      <TextInput
        placeholder={Lang === "en" ? "Your Name" : "ادخل اسمك"}
        placeholderColor="#c4c3cb"
        onChangeText={(e) => {
          setName(e);
          setNameError("");
        }}
        value={Name}
        style={styles.loginFormTextInput}
      />
      <Text style={styles.errorText}>{NameError}</Text>
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
        style={styles.loginFormTextInput}
        secureTextEntry={true}
        onChangeText={(e) => {
          setPassword(e);
          setPasswordError("");
        }}
        value={Password}
      />
      <Text style={styles.errorText}></Text>
      <Text style={styles.label}>
        {Lang === "en" ? "Re-type password" : "تأكيد كلمة السر"}
      </Text>
      <TextInput
        placeholder={
          Lang === "en" ? "Re-type your Password" : "ادخل كلمة السر مرة أخرى"
        }
        placeholderColor="#c4c3cb"
        style={styles.loginFormTextInput}
        secureTextEntry={true}
        onChangeText={(e) => {
          setRePassword(e);
          setPasswordError("");
        }}
        value={RePassword}
      />
      <Text style={styles.errorText}>{PasswordError}</Text>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>
          {Lang === "en" ? "Sign Up" : "إنشاء"}
        </Text>
      </TouchableOpacity>

      <Text>
        {Lang === "en" ? "Already a member?" : "لديك حساب؟"}{" "}
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate("Login")}
        >
          {Lang === "en" ? "Login" : "تسجيل الدخول"}
        </Text>
      </Text>
    </View>
  );
}
