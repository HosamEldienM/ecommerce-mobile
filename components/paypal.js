import { View, Text } from "react-native";
import React from "react";
import { useContext, useEffect, useRef } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { LangContext } from "../contexts/langcontext";

const Paypal = ({ Paid, setPaid, totlaPrice }) => {
  const { Lang } = useContext(LangContext);
  return (
    <View style={{ width: "90%" }}>
      {!Paid && (
        <View>
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {Lang === "en"
              ? `Total Price: ${totlaPrice()} EGP`
              : `إجمالي السعر:  ${totlaPrice()} جنيه`}
          </Text>
          <View>
            <PayPalButton
              amount={totlaPrice()}
              onSuccess={() => {
                setPaid(true);
              }}
              options={{
                clientId:
                  "AXdxOatM8UsLCEcw0hTB241tJ5DOJgl-ZD7_wcjhNWZFbhRvjCN7F6CkIAwnbXFH4nJ1e0w3k24IWCSH",
              }}
            />
          </View>
        </View>
      )}
      {Paid && (
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {Lang === "en" ? "Amount paid successfully" : "تم الدفع بنجاح"}
        </Text>
      )}
    </View>
  );
};

export default Paypal;
