import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import {
  Spartan_800ExtraBold,
  Spartan_700Bold,
  Spartan_600SemiBold,
  Spartan_500Medium,
  Spartan_400Regular,
  useFonts,
} from "@expo-google-fonts/spartan";

const Resetpassword = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Password reset successfully</Text>
              <Link
                href={"/login"}
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.button]}
              >
                <Text style={styles.textStyle}>Sign In</Text>
              </Link>
            </View>
          </View>
        </Modal>
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
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <Image source={icons.passwordicon} style={styles.icon} />
        </View>
        <View style={styles.relativeform}>
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <Image source={icons.passwordicon} style={styles.icon} />
        </View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    justifyContent: "center",
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
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontFamily: "Spartan_500Medium",
  },
  welcomtext: {
    fontWeight: "semibold",
    color: "#1C2A3A",
    fontSize: 25,
    fontFamily: "Spartan_600SemiBold",
    paddingVertical: 30,
  },
  input: {
    color: "#1C2A3A",
    borderColor: "#D1D5DB",
    borderWidth: 2,
    height: 45,
    borderRadius: 7,
    paddingLeft: 40,
    fontFamily: "Spartan_500Medium",
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
    fontFamily: "Spartan_600SemiBold",
    color: "white",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,

    padding: 35,
    width: 300,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openmodalbutton: {
    elevation: 2,
    backgroundColor: "#1C2A3A",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginTop: 30,
  },

  buttonClose: {
    backgroundColor: "#1C2A3A",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Spartan_600SemiBold",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Spartan_500Medium",
  },
});
