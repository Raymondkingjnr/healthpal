import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Button,
} from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function signupwithemail() {
    setIsLoading(true);
    if (!email || !password) {
      Alert.alert("Field can not be empty");
    }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setIsLoading(false);
  }
  return (
    <View style={styles.container}>
      <Image source={icons.icon} />
      <Text style={styles.headertext}>
        Health<Text style={styles.spantext}>Pal</Text>{" "}
      </Text>
      <Text style={styles.welcomtext}>Hi, Welcome Back!</Text>
      <Text style={[styles.spantext, styles.downtext]}>
        Hope you’re doing fine.
      </Text>
      {/* <View style={styles.inputFlex}> */}
      {/* <View style={styles.relativeform}>
        <TextInput
          placeholder="Enter fullname"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <Image source={icons.usericon} style={styles.icon} />
      </View> */}
      <View style={styles.relativeform}>
        <TextInput
          autoCapitalize={"none"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Your Email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <Image source={icons.smsicon} style={styles.icon} />
      </View>
      <View style={styles.relativeform}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={true}
          value={password}
          autoCapitalize={"none"}
          onChangeText={(text) => setPassword(text)}
        />
        <Image source={icons.passwordicon} style={styles.icon} />
        {/* </View> */}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => signupwithemail()}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
      <View style={styles.flex}>
        <View style={styles.rltline} />
        <Text>Or</Text>
        <View style={styles.rltline} />
      </View>
      <Pressable style={styles.googlebtn}>
        <Image source={icons.googleIcon} />
        <Text style={[styles.buttonText, styles.googletext]}>
          Sign in with Google
        </Text>
      </Pressable>

      <Link href={"/login"} asChild>
        <Pressable>
          <Text style={styles.signupbutton}>
            Already have an account?{" "}
            <Text style={styles.forgetpasswordtext}>Sign in</Text>{" "}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  headertext: {
    textAlign: "center",
    paddingTop: 14,
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
  },
  welcomtext: {
    fontWeight: "semibold",
    color: "#1C2A3A",
    fontSize: 30,
    paddingTop: 20,
  },
  input: {
    color: "#1C2A3A",
    borderColor: "#D1D5DB",
    borderWidth: 2,
    height: 45,
    borderRadius: 7,
    fontSize: 18,
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
  rltline: {
    height: 1,
    width: "55%",
    backgroundColor: "#979797",
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  googlebtn: {
    backgroundColor: "F#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    display: "flex",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 30,
  },
  googletext: {
    color: "#1C2A3A",
  },
  forgetpassword: {
    marginTop: 25,
  },
  forgetpasswordtext: {
    color: "#1C64F2",
    fontWeight: "600",
    fontSize: 14,
  },
  signupbutton: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 14,
  },
});
