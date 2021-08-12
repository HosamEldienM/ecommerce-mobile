import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import style from "../assets/style";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../config/config";
import { UserContext } from "../contexts/usercontext";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { FontAwesome } from "@expo/vector-icons";
import LangauageButton from "./langagebutton";
import { LangContext } from "../contexts/langcontext";
const Profile = () => {
  const { User, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const navigation = useNavigation();
  const { Lang } = useContext(LangContext);

  return (
    <View style={style.page}>
      <LangauageButton />
      <FontAwesome name="user-circle" color="#7239c9" size={200} />

      <Text
        style={{
          fontSize: 33,
          fontWeight: "600",
          padding: 10,
          color: "#7239c9",
        }}
      >
        {Lang === "en" ? "Welcome " : "مرحباً "} {User && User.Name}
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "400",
          padding: 10,
          color: "#7239c9",
        }}
      >
        {User && User.Email}
      </Text>

      {!User ? (
        <>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: "orange", width: "60%" }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={style.buttonText}>
              {" "}
              {Lang === "en" ? "Login" : "تسجيل الدخول"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: "orange", width: "60%" }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={style.buttonText}>
              {" "}
              {Lang === "en" ? "Sign Up" : "إنشاء حساب"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: "orange", width: "60%" }}
          onPress={() => {
            const time = new Date();
            db.collection("Users")
              .doc(auth.currentUser.uid)
              .update({ LastSeen: time.getTime() })
              .then(async () => {
                await auth.signOut();
                setCart([]);
                setUser(null);
              });
          }}
        >
          <Text style={style.buttonText}>
            {Lang === "en" ? "Sign Out" : "تسجيل الخروج"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profile;
