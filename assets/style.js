const React = require("react-native");

const { StyleSheet } = React;

export default {
  page: {
    flex: 1,
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    padding: 3,
    borderRadius: 4,
  },
  pickerText: { marginLeft: 30, marginRight: 10 },

  logoText: {
    fontSize: 36,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
    color: "#7239c9",
  },

  loginFormTextInput: {
    height: 40,
    fontSize: 14,
    borderRadius: 5,
    borderColor: "#eaeaea",
    backgroundColor: "white",
    paddingLeft: 10,
    width: "90%",
    marginTop: 10,
    textAlign: "left",
    outline: "none",
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "#7239c9",
    paddingVertical: 10,
    borderRadius: 5,
    height: 45,
    width: "80%",
    shadowRadius: 8,
    shadowOpacity: 0.4,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "left",
    width: "90%",
  },
  textLink: {
    textDecorationLine: "underline",
    color: "#7239c9",
  },
  label: {
    textAlign: "left",
    width: "90%",
    marginTop: 10,
  },
  picker: { height: 40, width: 100 },
};
