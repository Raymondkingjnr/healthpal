import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { icons } from "@/constants/icons";
import { Link, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  Spartan_500Medium,
  Spartan_600SemiBold,
  Spartan_700Bold,
  Spartan_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/spartan";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useLocalSearchParams } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const params = useLocalSearchParams();
  const passedName = typeof params.name === "string" ? params.name : undefined;

  async function resetPassword() {
    setIsLoading(true);
    if (!email) {
      Alert.alert("Field can not be empty");
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:8081",
    });
    if (error) Alert.alert(error.message);
    if (data) Alert.alert("Check your email for reset link!");
    setIsLoading(false);
  }

  useEffect(() => {
    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
          router.push("/homes");
        } else {
          setUser(null);
        }
      }
    );
    return () => subscription?.unsubscribe();
  }, []);

  async function signinwithemail() {
    setIsLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Login Successful");
      if (data?.user) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            full_name: passedName,
            is_doctor: false,
            email: email,
          },
        ]);

        if (profileError) {
          console.error("Profile creation error:", profileError);

          Alert.alert("Account Created");
          return;
        }
      } else {
        return;
      }
    }
    setIsLoading(false);
  }

  const [loading, error] = useFonts({
    Spartan_500Medium,
    Spartan_600SemiBold,
    Spartan_700Bold,
    Spartan_800ExtraBold,
  });

  if (!loading && !error) {
    return null;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView>
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
            <View style={styles.relativeform}>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Entypo name="mail" style={styles.icon} size={15} color="black" />
            </View>
            <View style={styles.relativeform}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={showPassword ? false : true}
                value={password}
                autoCapitalize={"none"}
                onChangeText={(text) => setPassword(text)}
              />

              <Entypo style={styles.icon} name="lock" size={15} color="#000" />
              {!showPassword ? (
                <Entypo
                  name="eye-with-line"
                  style={styles.password}
                  size={25}
                  color="black"
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <Entypo
                  name="eye"
                  style={styles.password}
                  size={25}
                  color="black"
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              )}
            </View>
            <Pressable
              style={styles.button}
              disabled={isLoading}
              onPress={() => signinwithemail()}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Loading..." : " Sign In"}
              </Text>
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
            {/* <Link href={"/password-reset"} asChild> */}
            <Pressable
              style={styles.forgetpassword}
              onPress={() => resetPassword()}
            >
              <Text style={styles.forgetpasswordtext}>Forgot password?</Text>
            </Pressable>
            {/* </Link> */}

            <Link href={"/sign-up"} asChild>
              <Pressable>
                <Text style={styles.signupbutton}>
                  Don’t have an account yet?{" "}
                  <Text style={styles.forgetpasswordtext}>Sign up</Text>{" "}
                </Text>
              </Pressable>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    marginTop: 80,
    flex: 1,
  },
  headertext: {
    textAlign: "center",
    paddingTop: 17,
    fontSize: 25,
    fontWeight: "600",
    color: "#6B7280",
    fontFamily: "Spartan_800ExtraBold",
  },
  spantext: {
    color: "#1C2A3A",
  },
  downtext: {
    paddingTop: 20,
    color: "#6B7280",
    fontFamily: "Spartan_600SemiBold",
    fontSize: 18,
    fontWeight: "300",
  },
  welcomtext: {
    fontWeight: "semibold",
    color: "#1C2A3A",
    fontFamily: "Spartan_600SemiBold",
    fontSize: 30,
    paddingTop: 50,
  },
  input: {
    color: "#1C2A3A",
    fontFamily: "Spartan_500Medium",
    borderColor: "#D1D5DB",
    borderWidth: 2,
    height: 45,
    borderRadius: 7,
    fontSize: 18,
    paddingLeft: 40,
    width: "100%",
    fontWeight: "500",
  },
  password: {
    position: "absolute",
    top: 9,
    right: 15,
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
    fontWeight: "700",
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
    fontFamily: "Spartan_600SemiBold",
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
    fontFamily: "Spartan_600SemiBold",
  },
  forgetpassword: {
    marginTop: 25,
  },
  forgetpasswordtext: {
    color: "#1C64F2",
    fontFamily: "Spartan_700Bold",
    fontWeight: "600",
    fontSize: 16,
  },
  signupbutton: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Spartan_700Bold",
  },
});
