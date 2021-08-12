import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../config/config";
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("ss");
      if (user != null) {
        db.collection("Users")
          .where("Email", "==", user.email)
          .get()
          .then((res) =>
            res.forEach((x) => {
              setUser({ ...x.data(), ID: x.id });
            })
          );
      }
    });
  }, [auth]);

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
