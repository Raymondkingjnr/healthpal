import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type ButtonComProps = {
  text: string;
  onPress?: () => void;
};

const ButtonCom = ({ text, onPress }: ButtonComProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default ButtonCom;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1C2A3A",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "Spartan_600SemiBold",
    color: "white",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
});
