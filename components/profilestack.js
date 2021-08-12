import React from "react";
import Login from "./login";
import Signup from "./signup";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import { UserContext } from "../contexts/usercontext";
import { useContext } from "react";
import { LangContext } from "../contexts/langcontext";

const { Navigator, Screen } = createStackNavigator();

export default function ProfileStack() {
  const { User, setUser } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#7239c9" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
      <Screen
        name="Profile"
        component={Profile}
        options={{ title: Lang === "en" ? "Profile" : "الملف الشخصي" }}
      />
      {!User && (
        <Screen
          name="Login"
          options={{ title: Lang === "en" ? "Login" : "تسجيل الدخول" }}
          component={Login}
        />
      )}
      {!User && (
        <Screen
          name="Signup"
          component={Signup}
          options={{ title: Lang === "en" ? "Sign Up" : "إنشاء حساب" }}
        />
      )}
    </Navigator>
  );
}
