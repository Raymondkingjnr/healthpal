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
import {
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_600SemiBold,
  Spartan_700Bold,
  Spartan_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/spartan";
import ButtonCom from "@/components/button-com";

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
    <ButtonCom text="Send Code" onPress={() => navigation.navigate("OTP")} />
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
    <ButtonCom
      text="Verify"
      onPress={() => navigation.navigate("ResetPassword")}
    />
  </SafeAreaView>
);
const ResetPassword = () => <Resetpassword />;

const Passwordreset = () => {
  const [loading, error] = useFonts({
    Spartan_500Medium,
    Spartan_600SemiBold,
    Spartan_700Bold,
    Spartan_800ExtraBold,
    Spartan_400Regular,
  });

  if (!loading && !error) {
    return null;
  }
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
    fontFamily: "Spartan_800ExtraBold",
    fontSize: 25,
    fontWeight: "400",
    color: "#6B7280",
  },
  spantext: {
    color: "#1C2A3A",
  },
  downtext: {
    color: "#6B7280",
    fontSize: 19,
    fontFamily: "Spartan_500Medium",
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomtext: {
    fontWeight: "semibold",
    fontFamily: "Spartan_600SemiBold",
    color: "#1C2A3A",
    fontSize: 26,
    paddingVertical: 30,
  },
  input: {
    color: "#1C2A3A",
    borderColor: "#D1D5DB",
    borderWidth: 2,
    height: 45,
    fontSize: 18,
    fontFamily: "Spartan_500Medium",
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
    fontFamily: "Spartan_600SemiBold",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
});
