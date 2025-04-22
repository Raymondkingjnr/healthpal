import { View, Text, Image, FlatList, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { images } from "@/constants/images";
import { categories } from "@/constants/data";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spartan_600SemiBold } from "@expo-google-fonts/spartan";

const Home = () => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data?.user);
      }
    };
    fetchUser();
  }, []);

  function getFirstName(email: string | undefined) {
    if (!email) return "User";
    const namePart = email.split("@")[0];
    const firstName = namePart.split(".")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.flex_between}>
        <Text style={styles.name}>
          {user ? `Welcome, ${getFirstName(user.email)}` : "Loading user..."}
        </Text>
        <EvilIcons
          name="bell"
          size={35}
          color="black"
          style={{
            fontWeight: "700",
          }}
        />
      </View>

      <View style={styles.relativeform}>
        <TextInput
          style={styles.input}
          placeholder="Search Doctor"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
        <EvilIcons
          style={styles.icon}
          name="search"
          size={30}
          color="#D1D5DB"
        />
      </View>

      <View style={{ paddingTop: 40 }}>
        <Text style={[styles.categories]}>Categories</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 10,

          paddingBottom: 5,
          marginBottom: 10,
          marginTop: 15,
        }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image source={item.image} style={{ marginBottom: 10 }} />
            <Text
              className=" truncate w-[100px]"
              style={[styles.text, styles.truncatText]}
            >
              {item.name.length > 10
                ? `${item.name.substring(0, 8)}...`
                : item.name}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFFF",
    display: "flex",
    flexDirection: "column",
    height: "100%",

    paddingHorizontal: 10,
    fontFamily: "Spartan_600SemiBold",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Spartan_500Medium",
  },
  truncatText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  name: {
    fontFamily: "Spartan_600SemiBold",
    paddingTop: 7,
  },
  input: {
    color: "#1C2A3A",
    fontFamily: "Spartan_600SemiBold",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    height: 45,
    borderRadius: 7,
    fontSize: 18,
    paddingLeft: 40,
    width: "100%",
    fontWeight: "500",
  },
  relativeform: {
    position: "relative",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    position: "absolute",
    bottom: 11,
    left: 5,
  },
  flex_between: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  categories: {
    fontWeight: "700",
    fontFamily: "Spartan_600SemiBold",
    fontSize: 20,
  },
});

export default Home;
