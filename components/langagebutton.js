import { useContext } from "react";
import React from "react";
import { LangContext } from "../contexts/langcontext";
import { Text, TouchableOpacity } from "react-native";
import style from "../assets/style";
import { I18nManager } from "react-native";

const LangauageButton = () => {
  const { Lang, setLang } = useContext(LangContext);
  return (
    <TouchableOpacity
      style={{
        marginBottom: 50,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        position: "absolute",
        top: 0,
        shadowRadius: 8,
        shadowOpacity: 0.4,
        elevation: 10,
      }}
      onPress={() => {
        if (Lang === "en") {
          setLang("ar");
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
        }
        if (Lang === "ar") {
          setLang("en");
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
      }}
    >
      <Text style={{ color: "#7239c9", textAlign: "center", fontSize: 22 }}>
        {Lang === "en" ? "تغيير اللغة للعربية" : "Change language to English"}
      </Text>
    </TouchableOpacity>
  );
};

export default LangauageButton;
