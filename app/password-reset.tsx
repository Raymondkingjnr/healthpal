import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { icons } from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Resetpassword from "@/components/reset-password";

const Stack = createNativeStackNavigator();

const Entermail = ({ navigation }: any) => (
  <View style={styles.container}>
    <Image source={icons.icon} />
    <Text style={styles.headertext}>
      Health<Text style={styles.spantext}>Pal</Text>{" "}
    </Text>
    <Text style={styles.welcomtext}>Forget Password?</Text>
    <Text style={[styles.spantext, styles.downtext]}>
      Enter your Email, we will send you a verification code.
    </Text>
    {/* <View style={styles.inputFlex}> */}
    <View style={styles.relativeform}>
      <TextInput
        placeholder="Your Email"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
      <Image source={icons.smsicon} style={styles.icon} />
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("OTP")}
    >
      <Text style={styles.buttonText}>Send Code</Text>
    </TouchableOpacity>
  </View>
);

const OTPscreen = ({ navigation }: any) => (
  <SafeAreaView style={styles.otpcontainer}>
    <Image source={icons.icon} />
    <Text style={styles.headertext}>
      Health<Text style={styles.spantext}>Pal</Text>{" "}
    </Text>
    <Text style={styles.welcomtext}>Verify Code</Text>
    <Text style={[styles.spantext, styles.downtext]}>
      Enter the the code we just sent you on your registered Email
    </Text>
    <OtpInput numberOfDigits={4} focusColor={"#1C2A3A"} autoFocus={false} />
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ResetPassword")}
    >
      <Text style={styles.buttonText}>Verify</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
const ResetPassword = () => <Resetpassword />;

const Passwordreset = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Entermail"
        component={Entermail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Passwordreset;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  otpcontainer: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headertext: {
    textAlign: "center",
    paddingTop: 17,
    fontSize: 25,
    fontWeight: "400",
    color: "#6B7280",
  },
  spantext: {
    color: "#1C2A3A",
  },
  downtext: {
    paddingTop: 20,
    color: "#6B7280",
    fontSize: 19,
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomtext: {
    fontWeight: "semibold",
    color: "#1C2A3A",
    fontSize: 30,
    paddingTop: 50,
  },
  input: {
    color: "#1C2A3A",
    borderColor: "#D1D5DB",
    borderWidth: 2,
    height: 45,
    fontSize: 18,
    borderRadius: 7,
    paddingLeft: 40,
    width: "100%",
    fontWeight: "500",
  },
  inputFlex: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    paddingTop: 30,
  },
  relativeform: {
    position: "relative",
    width: "100%",
    marginTop: 30,
  },
  icon: {
    position: "absolute",
    bottom: 14,
    left: 10,
  },
  button: {
    backgroundColor: "#1C2A3A",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
});
